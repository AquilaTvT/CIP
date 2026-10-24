#!/usr/bin/env python3
"""Build the bundled original problem sets.

Sources live in packs/ci-original/*.py. Each module defines SET: trilingual texts, the sample
data files and four parts. For every part this script

  * runs the reference solution on each sample and checks the expected output written in the
    source, so statements and solutions cannot drift apart;
  * generates hidden tests with a seeded random generator and records the reference output;
  * compares an independent brute-force program with the reference on every test when the
    part provides one.

Output: data/packs/ci-original.json (an importable problem pack, also a format example) and
data/packs/ci-original.js (the same data for the offline app). --check fails on stale output.
"""
from pathlib import Path
import argparse
import importlib.util
import json
import random
import subprocess
import sys
import tempfile
import time
import zlib

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'packs' / 'ci-original'
OUTPUT_JSON = ROOT / 'data' / 'packs' / 'ci-original.json'
OUTPUT_JS = ROOT / 'data' / 'packs' / 'ci-original.js'
SLOW_SECONDS = 1.0

PACK = {
    'format': 'plume-pack',
    'version': 1,
    'id': 'ci-original',
    'title': {'zh': 'CI 原创套题', 'ja': 'CI オリジナル問題', 'en': 'CI Original Sets'},
    'description': {
        'zh': '按上机考试常见的形式编写：一个情境、四个由浅入深的小问，多数套题附带需要读取的数据文件。',
        'ja': 'プログラミング試験によくある形式で作成：1 つの設定と段階的な 4 つの小問。多くのセットでは読み込むデータファイルが付く。',
        'en': 'Written in the usual shape of the programming exam: one scenario and four parts of rising difficulty, usually with a data file to read.',
    },
    'author': 'Plume',
    'license': 'MIT',
}


def load(path):
    spec = importlib.util.spec_from_file_location(f'pack_source_{path.stem}', path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.SET


def run(code, stdin, files, label):
    with tempfile.TemporaryDirectory(prefix='plume-pack-') as directory:
        for name, content in files.items():
            with open(Path(directory) / name, 'w', encoding='utf-8', newline='') as handle:
                handle.write(content)
        started = time.perf_counter()
        result = subprocess.run([sys.executable, '-I', '-c', code], input=stdin, cwd=directory, capture_output=True,
                                text=True, encoding='utf-8', timeout=60)
        elapsed = time.perf_counter() - started
    if result.returncode != 0:
        raise SystemExit(f'{label}: program failed\n{result.stderr}')
    return result.stdout, elapsed


def build():
    pack = {**PACK, 'sets': [], 'problems': []}
    slow = []
    for path in sorted(SOURCE.glob('[a-z]_*.py')):
        source = load(path)
        pack['sets'].append({'id': source['id'], 'title': source['title'], 'preamble': source['preamble'],
                             'files': source['files'], 'minutes': source['minutes']})
        if len(source['parts']) != 4 or sum(part['points'] for part in source['parts']) != 100:
            raise SystemExit(f"{source['id']}: a set has four parts worth 100 points in total")
        for part in source['parts']:
            label = part['id']
            for lang in ['zh', 'ja', 'en']:
                for field in ['title', 'statement', 'explanation']:
                    if not part[field].get(lang, '').strip():
                        raise SystemExit(f'{label}: missing {lang} {field}')
            shared = {**source['files'], **part.get('files', {})}
            samples = []
            for index, sample in enumerate(part['samples']):
                files = {**shared, **sample.get('files', {})}
                output, _ = run(part['solution'], sample['input'], files, f'{label} sample {index + 1}')
                if output != sample['expected']:
                    raise SystemExit(f'{label} sample {index + 1}: expected {sample["expected"]!r}, got {output!r}')
                samples.append({'input': sample['input'], 'output': output, **({'files': sample['files']} if sample.get('files') else {})})
            rng = random.Random(zlib.crc32(label.encode()))
            tests = []
            for index, test in enumerate(part['tests'](rng)):
                files = {**shared, **test.get('files', {})}
                output, elapsed = run(part['solution'], test['input'], files, f'{label} test {index + 1}')
                if elapsed > SLOW_SECONDS:
                    slow.append(f'{label} test {index + 1}: {elapsed:.2f}s')
                if part.get('brute'):
                    expected, _ = run(part['brute'], test['input'], files, f'{label} brute {index + 1}')
                    if expected != output:
                        raise SystemExit(f'{label} test {index + 1}: reference and brute force disagree\n{output[:300]!r}\n{expected[:300]!r}')
                tests.append({'input': test['input'], 'output': output, **({'files': test['files']} if test.get('files') else {})})
            pack['problems'].append({
                'id': label, 'set': source['id'], 'title': part['title'], 'level': part['level'], 'points': part['points'],
                'statement': part['statement'], **({'files': part['files']} if part.get('files') else {}),
                'samples': samples, 'tests': tests,
                **({'checker': part['checker']} if part.get('checker') else {}),
                'timeLimit': part.get('timeLimit', 6),
                'solution': {'code': part['solution'], 'explanation': part['explanation']},
            })
    return pack, slow


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--check', action='store_true', help='fail if the committed pack differs from the sources')
    args = parser.parse_args()
    pack, slow = build()
    text = json.dumps(pack, ensure_ascii=False, indent=1) + '\n'
    script = ('/* Plume original problem sets. Generated by scripts/build_packs.py from packs/ci-original. */\n'
              'window.PLUME_BUNDLED_PACKS = (window.PLUME_BUNDLED_PACKS || []).concat('
              + json.dumps(pack, ensure_ascii=False, separators=(',', ':')) + ');\n')
    problems = len(pack['problems'])
    tests = sum(len(problem['tests']) for problem in pack['problems'])
    if args.check:
        if OUTPUT_JSON.read_text(encoding='utf-8') != text or OUTPUT_JS.read_text(encoding='utf-8') != script:
            raise SystemExit('The bundled problem pack is stale. Run python3 scripts/build_packs.py.')
        print(f'Problem pack matches its sources: {len(pack["sets"])} sets, {problems} parts, {tests} hidden tests.')
        return
    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.write_text(text, encoding='utf-8')
    OUTPUT_JS.write_text(script, encoding='utf-8')
    print(f'{len(pack["sets"])} sets, {problems} parts, {tests} hidden tests; {len(script) / 1024:.0f} KiB')
    for line in slow:
        print('slow reference run:', line)


if __name__ == '__main__':
    main()
