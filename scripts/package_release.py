#!/usr/bin/env python3
"""Package the app and a source-only checkout without local practice data."""
from pathlib import Path
import hashlib
import json
import subprocess
import zipfile

ROOT = Path(__file__).resolve().parents[1]
RELEASE = ROOT / 'release'
SOURCE_ITEMS = (
    '.github', '.gitignore', 'README.md', 'CONTRIBUTING.md', 'SECURITY.md',
    'LICENSE', 'THIRD_PARTY_NOTICES.md', 'CIPractice.icns', 'app.js',
    'index.html', 'styles.css', 'pyworker.js', 'start.py', 'data', 'vendor',
    'packaging', 'scripts', 'tests', 'docs', 'package.json', 'package-lock.json',
)


def main():
    RELEASE.mkdir(exist_ok=True)
    source = RELEASE / 'CI-Practice-source.zip'
    with zipfile.ZipFile(source, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for name in SOURCE_ITEMS:
            item = ROOT / name
            paths = sorted(item.rglob('*')) if item.is_dir() else [item]
            for path in paths:
                if (not path.is_file() or path.is_symlink()
                        or '__pycache__' in path.parts
                        or path.name == '.DS_Store'
                        or path.suffix == '.pyc'):
                    continue
                archive.write(path, Path('CI-Practice') / path.relative_to(ROOT))
    with zipfile.ZipFile(source) as archive:
        assert archive.testzip() is None, 'Source archive CRC failed'
        library = json.loads(archive.read('CI-Practice/data/statements.json'))
        assert len(library) == 221
        assert all(set(('ja', 'en', 'zh')) <= set(task) for task in library.values())
    outputs = [source]
    app = ROOT / 'dist' / 'CI Practice.app'
    if app.is_dir():
        architectures = subprocess.check_output(['lipo', '-archs', str(app / 'Contents/MacOS/CI Practice')], text=True).split()
        target = 'Universal' if len(architectures) > 1 else ('AppleSilicon' if architectures == ['arm64'] else 'Intel')
        app_archive = RELEASE / f'CI-Practice-macOS-{target}.zip'
        subprocess.run(['codesign', '--verify', '--deep', '--strict', str(app)], check=True)
        subprocess.run(['ditto', '-c', '-k', '--keepParent', '--norsrc', str(app), str(app_archive)], check=True)
        with zipfile.ZipFile(app_archive) as archive:
            assert archive.testzip() is None, 'App archive CRC failed'
            assert archive.read('CI Practice.app/Contents/Resources/storage-bridge.js') == (ROOT / 'packaging/storage-bridge.js').read_bytes(), 'Stale native storage bridge'
            prefix = 'CI Practice.app/Contents/Resources/site/'
            for name in ('index.html', 'styles.css', 'app.js', 'pyworker.js',
                         'vendor/editor.js', 'data/statements.json', 'data/statements.js',
                         'data/metadata.json', 'data/metadata.js'):
                assert archive.read(prefix + name) == (ROOT / name).read_bytes(), f'Stale app file: {name}'
        outputs.append(app_archive)
    checksums = ''.join(f'{hashlib.sha256(path.read_bytes()).hexdigest()}  {path.name}\n' for path in outputs)
    (RELEASE / 'SHA256SUMS.txt').write_text(checksums)
    for path in outputs:
        print(f'{path.name}: {path.stat().st_size / 1024 / 1024:.1f} MiB')
    print('Verified: 221 tasks, 663 statements, current app assets and archive CRCs.')


if __name__ == '__main__':
    main()
