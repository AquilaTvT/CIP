"""Opt-in native integration tests; set CI_NATIVE_APP to a built .app bundle.

Run on a logged-in macOS desktop. No accessibility or screen-recording permission
is required. All tests use nonpersistent WebKit storage. Restart tests use one
dedicated key and a temporary native snapshot directory, never user records.
Set CI_NATIVE_PROGRESS_LOG to a temporary log path for live native diagnostics.
"""
import json
import os
from pathlib import Path
import plistlib
import subprocess
import sys
import time
import tempfile
import unittest
from urllib.request import urlopen

APP = os.environ.get('CI_NATIVE_APP', '')


@unittest.skipUnless(sys.platform == 'darwin' and APP, 'Set CI_NATIVE_APP on macOS to run native integration tests')
class NativeRuntimeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        contents = Path(APP).resolve() / 'Contents'
        cls.info = plistlib.loads((contents / 'Info.plist').read_bytes())
        cls.executable = str(contents / 'MacOS' / cls.info['CFBundleExecutable'])

    def run_app(self, flag, storage_directory=None):
        environment = os.environ.copy()
        if storage_directory is not None:
            environment['CI_NATIVE_STORAGE_DIR'] = storage_directory
        timeout = 930 if flag in ('--runtime-test', '--network-test') else 110
        progress_log = os.environ.get('CI_NATIVE_PROGRESS_LOG')
        if progress_log:
            with open(progress_log, 'a+', encoding='utf-8') as log:
                log.seek(0, 2)
                offset = log.tell()
                result = subprocess.run([self.executable, flag], stdout=log, stderr=subprocess.PIPE, text=True, timeout=timeout, env=environment)
                log.seek(offset)
                result.stdout = log.read()
        else:
            result = subprocess.run([self.executable, flag], capture_output=True, text=True, timeout=timeout, env=environment)
        lines = [line for line in result.stdout.splitlines() if line.startswith('{')]
        self.assertTrue(lines, result.stderr or result.stdout)
        payload = json.loads(lines[-1])
        self.assertEqual(result.returncode, 0, payload)
        self.assertTrue(payload.get('ok'), payload)
        return payload

    def test_offline_runtime(self):
        result = self.run_app('--runtime-test')
        self.assertIn('fresh interpreter isolates modules and files', result['checks'])
        self.assertIn('local MathJax renders formulas', result['checks'])
        self.assertIn('all academy reference cases pass in WebKit Pyodide', result['checks'])
        self.assertIn('academy cases leave no interpreter or filesystem state', result['checks'])

    def test_native_settings_and_help(self):
        self.assertEqual(self.info['CFBundleIdentifier'], 'org.cipractice.desktop')
        self.assertEqual(self.info['CFBundleShortVersionString'], '1.1.0')
        result = self.run_app('--menu-test')
        self.assertIn('native Settings Command-comma shortcut', result['checks'])
        self.assertIn('Help opens local guide in existing view', result['checks'])

    def test_persistence_across_restarts(self):
        with tempfile.TemporaryDirectory(prefix='ci-native-storage-') as directory:
            snapshot = Path(directory) / 'state.json'
            self.run_app('--storage-test-write', directory)
            self.assertEqual(json.loads(snapshot.read_text())['values'], {'ci-practice-runtime-storage-probe': 'persisted'})
            self.assertEqual(snapshot.stat().st_mode & 0o777, 0o600)
            self.assertEqual(Path(directory).stat().st_mode & 0o777, 0o700)
            self.run_app('--storage-test-read', directory)
            self.assertEqual(json.loads(snapshot.read_text())['values'], {})
            self.run_app('--storage-test-empty', directory)
            self.run_app('--storage-test-write', directory)
            self.run_app('--storage-test-clear', directory)
            self.run_app('--storage-test-empty', directory)
        with tempfile.TemporaryDirectory(prefix='ci-native-migration-') as directory:
            self.run_app('--storage-test-migrate', directory)
            self.run_app('--storage-test-read', directory)

    def test_second_launch(self):
        host = subprocess.Popen([self.executable, '--lifecycle-test'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        try:
            deadline = time.monotonic() + 15
            while time.monotonic() < deadline and host.poll() is None:
                try:
                    with urlopen('http://127.0.0.1:18765/__health', timeout=1) as response:
                        if json.load(response).get('app') == self.info['CFBundleDisplayName']: break
                except OSError: time.sleep(.1)
            else: self.fail('Lifecycle test host did not start')
            second = subprocess.run([self.executable], capture_output=True, text=True, timeout=15)
            self.assertEqual(second.returncode, 0, second.stderr)
            output, errors = host.communicate(timeout=15)
            self.assertEqual(host.returncode, 0, output + errors)
            result = json.loads(next(line for line in output.splitlines() if line.startswith('{')))
            self.assertTrue(result.get('ok'), result)
        finally:
            if host.poll() is None:
                host.terminate()
                host.communicate(timeout=5)

    @unittest.skipUnless(os.environ.get('CI_NATIVE_NETWORK') == '1', 'Opt-in external metadata network check')
    def test_online_metadata_proxy(self):
        result = self.run_app('--network-test')
        self.assertIn('native online AtCoder metadata proxy', result['checks'])
        self.assertIn('native online AtCoder submissions proxy', result['checks'])


if __name__ == '__main__': unittest.main()
