#!/usr/bin/env python3
"""Restore pinned offline Pyodide files, verifying the checked-in SHA-256 lock."""
from pathlib import Path
import hashlib
import json
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
RUNTIME = ROOT / 'vendor' / 'pyodide'


def main():
    manifest = json.loads((RUNTIME / 'checksums.json').read_text())
    for item in manifest['files']:
        target = RUNTIME / item['name']
        if target.exists() and hashlib.sha256(target.read_bytes()).hexdigest() == item['sha256']:
            print('OK', item['name']); continue
        with tempfile.NamedTemporaryFile(dir=RUNTIME, delete=False) as temp:
            temporary = Path(temp.name)
        try:
            subprocess.run(['curl', '-fL', '--retry', '2', '--max-time', '600', '-o', str(temporary), item['url']], check=True)
            if hashlib.sha256(temporary.read_bytes()).hexdigest() != item['sha256']:
                raise SystemExit(f'Checksum mismatch: {item["name"]}')
            temporary.replace(target)
        finally:
            temporary.unlink(missing_ok=True)


if __name__ == '__main__': main()
