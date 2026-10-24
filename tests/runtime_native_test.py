"""Opt-in native integration tests; set CI_NATIVE_APP to a built .app bundle.

Run on a logged-in macOS desktop. No accessibility or screen-recording permission
is required. All tests use nonpersistent WebKit storage. Restart tests use one
dedicated key and a temporary native snapshot directory, never user records.
"""
import json
import os
from pathlib import Path
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
        cls.executable = str(Path(APP).resolve() / 'Contents/MacOS/CI Practice')

    def run_app(self, flag, storage_directory=None):
        environment = os.environ.copy()
        if storage_directory is not None:
            environment['CI_NATIVE_STORAGE_DIR'] = storage_directory
        result = subprocess.run([self.executable, flag], capture_output=True, text=True, timeout=110, env=environment)
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
                        if json.load(response).get('app') == 'CI Practice': break
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


if __name__ == '__main__': unittest.main()
