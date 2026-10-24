#!/usr/bin/env python3
"""Compile authored, multilingual course chapters into the offline browser bundle."""
from pathlib import Path
import argparse
import json

ROOT = Path(__file__).resolve().parents[1]
STAGES = ['start', 'python', 'methods', 'sequences', 'graphs', 'synthesis', 'exam']
PARTS = ['01-foundations.json', '02-methods.json', '03-algorithms.json', '04-exam.json']
LESSONS = 4 * len(STAGES)


def render():
    lessons = []
    for name in PARTS:
        part = json.loads((ROOT / 'data' / 'academy-parts' / name).read_text())
        if not isinstance(part, list):
            raise ValueError(f'{name}: expected a lesson array')
        lessons.extend(part)
    lessons.sort(key=lambda lesson: lesson['order'])
    if len(lessons) != LESSONS or len({item['id'] for item in lessons}) != LESSONS:
        raise ValueError(f'Expected {LESSONS} distinct lessons')
    for index, lesson in enumerate(lessons):
        if lesson['order'] != index + 1 or lesson['stage'] != STAGES[index // 4]:
            raise ValueError(f'Invalid course order: {lesson["id"]}')
        if set(lesson['content']) != {'zh', 'en', 'ja'}:
            raise ValueError(f'Missing language: {lesson["id"]}')
    payload = {'version': 2, 'lessons': lessons}
    return '/* Plume Foundations. Original course content, compiled by scripts/assemble_academy.py. */\nwindow.PLUME_ACADEMY = ' + json.dumps(payload, ensure_ascii=False, indent=2) + ';\n'


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Fail if the committed bundle is stale')
    args = parser.parse_args()
    output = render()
    destination = ROOT / 'data' / 'academy.js'
    if args.check:
        if destination.read_text() != output:
            raise SystemExit('Course bundle is stale. Run python3 scripts/assemble_academy.py.')
        print(f'Course bundle matches all {LESSONS} authored lessons.')
    else:
        destination.write_text(output)
        print(destination)
