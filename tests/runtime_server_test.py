import http.client
import importlib.util
import json
from pathlib import Path
import threading
import unittest
from unittest.mock import patch, MagicMock
import ssl
from urllib.error import URLError
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('server', ROOT / 'start.py')
server = importlib.util.module_from_spec(spec)
spec.loader.exec_module(server)


class RuntimeServerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = server.ThreadingHTTPServer(('127.0.0.1', 0), server.Handler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown(); cls.server.server_close(); cls.thread.join()

    def request(self, path, host=None):
        client = http.client.HTTPConnection('127.0.0.1', self.server.server_port)
        client.request('GET', path, headers={'Host':host} if host else {})
        response = client.getresponse()
        result = response.status, dict(response.getheaders()), response.read()
        client.close(); return result

    def test_health_and_static(self):
        health = json.loads(self.request('/__health')[2])
        self.assertEqual(health['app'], 'Plume')
        self.assertEqual(health['version'], '1.2.0')
        for path in ['/settings.js', '/library.js', '/academy.js', '/data/academy.js', '/data/packs/ci-original.js', '/assets/plume.svg']:
            self.assertEqual(self.request(path)[0], 200, path)
        self.assertEqual(self.request('/')[0], 200)
        self.assertEqual(self.request('/vendor/pyodide/pyodide.asm.wasm')[1]['Content-type'], 'application/wasm')

    def test_private_and_traversal_paths(self):
        for path in ['/.git/config', '/start.py', '/packaging/CIPractice.swift', '/data/../start.py', '/data/%2e%2e/start.py', '/data/', '/data/%00invalid', '/data/%FFinvalid', '/data/%5c..%5cstart.py']:
            self.assertEqual(self.request(path)[0], 404, path)

    def test_loopback_host(self):
        for host in ['unrelated.example', '127.0.0.1:bad', '127.0.0.1:1', 'user@localhost', 'localhost/evil']:
            self.assertEqual(self.request('/', host)[0], 403)

    def test_proxy_allowlist(self):
        self.assertTrue(server.allowed_proxy_url('https://kenkoooo.com/atcoder/resources/problems.json'))
        for target in ['http://kenkoooo.com/atcoder/resources/a', 'https://example.com/atcoder/resources/a', 'https://kenkoooo.com/private', 'https://user@kenkoooo.com/atcoder/resources/a', 'https://kenkoooo.com:8443/atcoder/resources/a', 'https://kenkoooo.com:bad/atcoder/resources/a', 'https://[broken/atcoder/resources/a', 'https://kenkoooo.com/atcoder/resources/../private', 'https://kenkoooo.com/atcoder/resources/%2e%2e/private']:
            self.assertFalse(server.allowed_proxy_url(target))
            self.assertEqual(self.request('/__proxy?url='+quote(target,safe=''))[0], 403)

    def test_system_trust_store_fallback(self):
        upstream = MagicMock()
        upstream.open.side_effect = URLError(ssl.SSLCertVerificationError('No local CA bundle'))
        with patch.object(server, 'build_opener', return_value=upstream), patch.object(server.shutil, 'which', return_value='/usr/bin/curl'), patch.object(server.subprocess, 'run') as run:
            run.return_value.stdout = b'[]'
            self.assertEqual(server.fetch_metadata('https://kenkoooo.com/atcoder/resources/problems.json'), [])
            command = run.call_args[0][0]
            self.assertNotIn('--insecure', command)
            self.assertNotIn('--location', command)
            self.assertIn('--max-filesize', command)

    def test_normal_upstream_json(self):
        upstream = MagicMock()
        upstream.open.return_value.__enter__.return_value.read.return_value = b'[1,2]'
        with patch.object(server, 'build_opener', return_value=upstream):
            self.assertEqual(server.fetch_metadata('https://kenkoooo.com/atcoder/resources/problems.json'), [1,2])

    def test_no_runtime_code_endpoint(self):
        self.assertEqual(self.request('/__execute')[0], 404)


if __name__ == '__main__': unittest.main()
