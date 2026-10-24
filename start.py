"""Optional development server. The packaged macOS app has its own native server.

Only public static assets and an allowlisted metadata proxy are served.
User Python code is evaluated by bundled Pyodide in a browser worker.
"""
import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import threading
import shutil
import ssl
import subprocess
from urllib.error import URLError
from urllib.parse import parse_qs, unquote, urlparse
from urllib.request import HTTPRedirectHandler, Request, build_opener
import webbrowser

ROOT = Path(__file__).resolve().parent
BUILD_ID = "ci-practice-offline-20261024"
PUBLIC_FILES = {"index.html", "app.js", "settings.js", "academy.js", "styles.css", "pyworker.js", "CIPractice.icns", "manifest.webmanifest"}
PUBLIC_DIRS = {"data", "vendor", "assets"}


def allowed_proxy_url(url):
    try:
        parsed = urlparse(url)
        return (parsed.scheme == "https" and parsed.hostname == "kenkoooo.com"
                and parsed.port in (None, 443) and not parsed.username and not parsed.password
                and not parsed.fragment and "\\" not in url and "\0" not in url
                and not any(part in {".", ".."} for part in unquote(parsed.path).split("/"))
                and parsed.path.startswith(("/atcoder/resources/", "/atcoder/atcoder-api/")))
    except (ValueError, TypeError):
        return False


class SafeRedirect(HTTPRedirectHandler):
    def redirect_request(self, request, fp, code, message, headers, newurl):
        if not allowed_proxy_url(newurl):
            raise ValueError("Metadata redirect is outside the allowlist")
        return super().redirect_request(request, fp, code, message, headers, newurl)


def fetch_metadata(url):
    """Use normal TLS verification; system curl can supply an OS trust store.

    python.org's macOS installation can lack its optional CA bundle. The fallback
    does not disable verification or follow redirects outside the URL allowlist.
    """
    if not allowed_proxy_url(url):
        raise ValueError("Metadata URL not allowed")
    request = Request(url, headers={"User-Agent": "CI-Practice", "Accept": "application/json"})
    try:
        with build_opener(SafeRedirect).open(request, timeout=20) as response:
            data = response.read(16_000_001)
    except URLError as error:
        curl = shutil.which("curl")
        if not isinstance(error.reason, ssl.SSLCertVerificationError) or not curl:
            raise
        result = subprocess.run([curl, "-q", "--fail", "--silent", "--show-error",
                                 "--proto", "=https", "--max-time", "20", "--connect-timeout", "10",
                                 "--max-filesize", "16000000", "--header", "Accept: application/json", url],
                                stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=22, check=True)
        data = result.stdout
    if len(data) > 16_000_000:
        raise ValueError("Metadata response is too large")
    return json.loads(data)


class Handler(SimpleHTTPRequestHandler):
    server_version = "CIPractice"
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, ".wasm": "application/wasm", ".js": "text/javascript; charset=utf-8"}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, *_):
        pass

    def json_response(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def valid_host(self):
        hosts = self.headers.get_all("Host", [])
        if len(hosts) != 1:
            return False
        try:
            host = urlparse("//" + hosts[0])
            return (host.hostname in {"127.0.0.1", "localhost"} and not host.username
                    and not host.password and not host.path and not host.query and not host.fragment and host.port in (None, self.server.server_port))
        except ValueError:
            return False

    def public_path(self):
        try:
            path = unquote(urlparse(self.path).path, errors="strict").lstrip("/") or "index.html"
            if "\0" in path or "\\" in path:
                return False
            parts = Path(path).parts
            if not parts or any(p.startswith(".") for p in parts):
                return False
            if not (path in PUBLIC_FILES or parts[0] in PUBLIC_DIRS):
                return False
            candidate = (ROOT / path).resolve()
            return candidate.is_relative_to(ROOT) and candidate.is_file()
        except (ValueError, OSError, UnicodeError):
            return False

    def do_GET(self):
        if not self.valid_host():
            self.send_error(403, "Loopback host required")
            return
        path = urlparse(self.path).path
        if path == "/__health":
            self.json_response({"ok": True, "app": "Plume", "version": "1.1.0", "build": BUILD_ID})
            return
        if path == "/__proxy":
            url = parse_qs(urlparse(self.path).query).get("url", [""])[0]
            try:
                if not allowed_proxy_url(url):
                    self.json_response({"error": "Metadata URL not allowed"}, 403)
                    return
                self.json_response(fetch_metadata(url))
            except Exception:
                self.json_response({"error": "Online metadata is currently unavailable"}, 502)
            return
        if not self.public_path():
            self.send_error(404)
            return
        super().do_GET()

    def do_HEAD(self):
        if urlparse(self.path).path == "/__health" and self.valid_host():
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            return
        if not self.valid_host() or not self.public_path():
            self.send_error(404)
            return
        super().do_HEAD()

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


def run():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--no-browser", action="store_true")
    args = parser.parse_args()
    try:
        server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    except OSError as error:
        parser.exit(1, f"Port {args.port} is unavailable. Close the previous server or choose --port. {error}\n")
    if not args.no_browser:
        threading.Timer(.2, lambda: webbrowser.open(f"http://127.0.0.1:{args.port}/")).start()
    print(f"Plume: http://127.0.0.1:{args.port}/", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    run()
