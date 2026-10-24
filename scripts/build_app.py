#!/usr/bin/env python3
"""Build a self-contained macOS .app using Apple's installed Swift compiler.

Build prerequisites: macOS 13.3+, Xcode Command Line Tools, Python 3.9+.
The resulting app needs none of these tools and runs Python inside bundled WASM.
"""
from pathlib import Path
import argparse
import hashlib
import json
import plistlib
import platform
import shutil
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
PRODUCT_NAME = 'Plume'
PRODUCT_VERSION = '1.1.0'
PRODUCT_BUILD = '20261024.2'


def build(destination, universal=False):
    if sys.platform != 'darwin':
        raise SystemExit('The macOS app must be built on macOS.')
    for name in ['pyodide.js', 'pyodide.asm.js', 'pyodide.asm.wasm', 'python_stdlib.zip', 'pyodide-lock.json']:
        if not (ROOT / 'vendor' / 'pyodide' / name).is_file():
            raise SystemExit(f'Missing offline runtime: {name}. Run scripts/vendor_pyodide.py first.')
    checksums = json.loads((ROOT / 'vendor' / 'pyodide' / 'checksums.json').read_text())
    for item in checksums['files']:
        path = ROOT / 'vendor' / 'pyodide' / item['name']
        if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != item['sha256']:
            raise SystemExit(f'Offline runtime checksum mismatch: {item["name"]}. Run scripts/vendor_pyodide.py.')
    subprocess.run([sys.executable, str(ROOT / 'scripts' / 'assemble_academy.py'), '--check'], check=True)
    destination = destination.resolve()
    if destination.suffix != '.app':
        raise SystemExit('--output must name an .app bundle')
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='ci-practice-build-', dir=destination.parent) as temporary:
        bundle = Path(temporary) / destination.name
        resources = bundle / 'Contents' / 'Resources'
        macos = bundle / 'Contents' / 'MacOS'
        resources.mkdir(parents=True); macos.mkdir()
        site = resources / 'site'; site.mkdir()
        for name in ['index.html', 'app.js', 'settings.js', 'academy.js', 'styles.css', 'pyworker.js']:
            shutil.copy2(ROOT / name, site / name)
        for name in ['data', 'vendor', 'assets']:
            if (ROOT / name).exists():
                shutil.copytree(ROOT / name, site / name, ignore=shutil.ignore_patterns('__pycache__', '.DS_Store', '*.pyc'))
        icon = ROOT / 'CIPractice.icns'
        if icon.exists(): shutil.copy2(icon, resources / icon.name)
        smoke = ROOT / 'tests' / 'runtime-browser.js'
        if smoke.exists(): shutil.copy2(smoke, resources / 'runtime-test.js')
        shutil.copy2(ROOT / 'packaging' / 'storage-bridge.js', resources / 'storage-bridge.js')
        # Keep the bundle identifier stable: renaming the product must not move
        # existing WebKit data, native snapshots, or window preferences.
        info = {'CFBundleName': PRODUCT_NAME, 'CFBundleDisplayName': PRODUCT_NAME,
                'CFBundleIdentifier': 'org.cipractice.desktop', 'CFBundleExecutable': PRODUCT_NAME,
                'CFBundlePackageType': 'APPL', 'CFBundleShortVersionString': PRODUCT_VERSION,
                'CFBundleVersion': PRODUCT_BUILD, 'CFBundleIconFile': 'CIPractice',
                'LSMinimumSystemVersion': '13.3', 'NSHighResolutionCapable': True,
                'NSAppTransportSecurity': {'NSAllowsLocalNetworking': True}}
        (bundle / 'Contents' / 'Info.plist').write_bytes(plistlib.dumps(info))
        command = ['xcrun', 'swiftc', '-O', '-swift-version', '5', '-framework', 'AppKit', '-framework', 'WebKit', '-framework', 'Network', str(ROOT / 'packaging' / 'CIPractice.swift')]
        executable = macos / PRODUCT_NAME
        cache = Path(temporary) / 'module-cache'; cache.mkdir()
        command.extend(['-module-cache-path', str(cache)])
        if universal:
            objects = []
            for architecture in ['arm64', 'x86_64']:
                obj = Path(temporary) / architecture
                subprocess.run(command + ['-target', f'{architecture}-apple-macosx13.3', '-o', str(obj)], check=True)
                objects.append(str(obj))
            subprocess.run(['lipo', '-create', *objects, '-output', str(executable)], check=True)
        else:
            subprocess.run(command + ['-target', f'{platform.machine()}-apple-macosx13.3', '-o', str(executable)], check=True)
        subprocess.run(['codesign', '--force', '--deep', '--sign', '-', str(bundle)], check=True)
        if destination.exists(): shutil.rmtree(destination)
        shutil.move(str(bundle), str(destination))
    print(destination)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=ROOT / 'dist' / f'{PRODUCT_NAME}.app')
    parser.add_argument('--universal', action='store_true', help='Build for Apple Silicon and Intel Macs.')
    args = parser.parse_args()
    build(args.output, args.universal)
