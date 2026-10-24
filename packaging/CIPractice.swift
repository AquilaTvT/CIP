import AppKit
import WebKit
import Network
import Darwin

// WebKit persists localStorage asynchronously in another process. Confirm each
// application-state mutation in our own atomic file before returning to JS.
final class DurableStorage {
    let file: URL
    let keys: Set<String>
    private(set) var values: [String: String]?

    init(directory: URL, keys: Set<String>) throws {
        self.file = directory.appendingPathComponent("state.json")
        self.keys = keys
        try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true, attributes: [.posixPermissions: 0o700])
        try FileManager.default.setAttributes([.posixPermissions: 0o700], ofItemAtPath: directory.path)
        if FileManager.default.fileExists(atPath: file.path) {
            let data = try Data(contentsOf: file)
            guard let envelope = try JSONSerialization.jsonObject(with: data) as? [String: Any],
                  envelope["schema"] as? Int == 1, let saved = envelope["values"] as? [String: String],
                  Set(saved.keys).isSubset(of: keys) else {
                throw NSError(domain: "CIPracticeStorage", code: 1, userInfo: [NSLocalizedDescriptionKey: "The saved practice snapshot could not be read. It has not been overwritten: \(file.path)"])
            }
            values = saved
            try FileManager.default.setAttributes([.posixPermissions: 0o600], ofItemAtPath: file.path)
        }
    }

    func commit(_ next: [String: String]) throws {
        guard Set(next.keys).isSubset(of: keys), next.values.reduce(0, { $0 + $1.utf8.count }) <= 25_000_000 else {
            throw NSError(domain: "CIPracticeStorage", code: 2, userInfo: [NSLocalizedDescriptionKey: "The practice snapshot is invalid or too large."])
        }
        if values == next { return }
        let data = try JSONSerialization.data(withJSONObject: ["schema": 1, "values": next], options: [.sortedKeys])
        let temporary = file.deletingLastPathComponent().appendingPathComponent(".state-\(UUID().uuidString).tmp")
        defer { try? FileManager.default.removeItem(at: temporary) }
        guard FileManager.default.createFile(atPath: temporary.path, contents: nil, attributes: [.posixPermissions: 0o600]) else {
            throw NSError(domain: "CIPracticeStorage", code: 3, userInfo: [NSLocalizedDescriptionKey: "The practice snapshot could not be created."])
        }
        let handle = try FileHandle(forWritingTo: temporary)
        do { try handle.write(contentsOf: data); try handle.synchronize(); try handle.close() }
        catch { try? handle.close(); throw error }
        guard rename(temporary.path, file.path) == 0 else { throw POSIXError(POSIXErrorCode(rawValue: errno) ?? .EIO) }
        values = next
    }
}

// The native application owns its loopback server. No Python install or terminal is needed.
final class LocalServer {
    let root: URL
    let port: UInt16
    let testPage: Bool
    var listener: NWListener?
    private let queue = DispatchQueue(label: "org.cipractice.http", attributes: .concurrent)
    init(root: URL, port: UInt16 = 18765, testPage: Bool = false) { self.root = root; self.port = port; self.testPage = testPage }

    func start(ready: @escaping () -> Void, failed: @escaping (String) -> Void) {
        do {
            let parameters = NWParameters.tcp
            parameters.requiredLocalEndpoint = .hostPort(host: "127.0.0.1", port: NWEndpoint.Port(rawValue: port)!)
            let server = try NWListener(using: parameters)
            listener = server
            server.stateUpdateHandler = { state in
                switch state {
                case .ready: DispatchQueue.main.async(execute: ready)
                case .failed(let error): DispatchQueue.main.async { failed(error.localizedDescription) }
                default: break
                }
            }
            server.newConnectionHandler = { connection in
                connection.start(queue: self.queue)
                self.queue.asyncAfter(deadline: .now() + 30) { connection.cancel() }
                self.read(connection, collected: Data())
            }
            server.start(queue: queue)
        } catch { failed(error.localizedDescription) }
    }

    private func read(_ connection: NWConnection, collected: Data) {
        connection.receive(minimumIncompleteLength: 1, maximumLength: 16384) { data, _, complete, error in
            var bytes = collected
            if let data = data { bytes.append(data) }
            if bytes.count > 16384 { self.respond(connection, status: 431, body: Data()); return }
            if bytes.range(of: Data("\r\n\r\n".utf8)) != nil { self.route(connection, request: String(decoding: bytes, as: UTF8.self)); return }
            if complete || error != nil { connection.cancel(); return }
            self.read(connection, collected: bytes)
        }
    }

    private func respond(_ connection: NWConnection, status: Int = 200, type: String = "application/json", body: Data, head: Bool = false) {
        let reason = status == 200 ? "OK" : status == 404 ? "Not Found" : "Error"
        let header = "HTTP/1.1 \(status) \(reason)\r\nContent-Type: \(type)\r\nContent-Length: \(body.count)\r\nConnection: close\r\nCache-Control: no-cache\r\nX-Content-Type-Options: nosniff\r\nX-Frame-Options: DENY\r\n\r\n"
        var packet = Data(header.utf8)
        if !head { packet.append(body) }
        connection.send(content: packet, completion: .contentProcessed { _ in connection.cancel() })
    }

    private func route(_ connection: NWConnection, request: String) {
        let lines = request.components(separatedBy: "\r\n")
        let first = (lines.first ?? "").split(separator: " ")
        let host = lines.first { $0.lowercased().hasPrefix("host:") }?.dropFirst(5).trimmingCharacters(in: .whitespaces) ?? ""
        guard host == "127.0.0.1:\(port)" || host == "localhost:\(port)" else { respond(connection, status: 403, body: Data()); return }
        guard first.count == 3, first[0] == "GET" || first[0] == "HEAD", first[1].hasPrefix("/") else { respond(connection, status: 405, body: Data()); return }
        let head = first[0] == "HEAD"
        guard let components = URLComponents(string: "http://127.0.0.1\(first[1])") else { respond(connection, status: 400, body: Data()); return }
        var path = components.path
        if testPage && path == "/__storage-test" {
            respond(connection, type: "text/html; charset=utf-8", body: Data("<!doctype html><title>Storage test</title>".utf8), head: head); return
        }
        if path == "/__health" {
            respond(connection, body: Data("{\"ok\":true,\"app\":\"CI Practice\",\"build\":\"ci-practice-offline-20261024\"}".utf8), head: head); return
        }
        if path == "/__proxy" {
            guard let value = components.queryItems?.first(where: { $0.name == "url" })?.value,
                  let url = URL(string: value), MetadataProxy.allowed(url) else { respond(connection, status: 403, body: Data()); return }
            MetadataProxy.fetch(url) { data in
                if let data = data { self.respond(connection, body: data, head: head) }
                else { self.respond(connection, status: 502, body: Data("{\"error\":\"Online metadata unavailable\"}".utf8)) }
            }
            return
        }
        if path == "/" { path = "/index.html" }
        let pieces = path.split(separator: "/").map(String.init)
        let publicFiles = ["index.html", "app.js", "styles.css", "pyworker.js", "manifest.webmanifest", "CIPractice.icns"]
        guard !pieces.isEmpty, !pieces.contains(where: { $0.hasPrefix(".") }),
              (publicFiles.contains(pieces.joined(separator: "/")) || ["data", "vendor", "assets"].contains(pieces[0])) else { respond(connection, status: 404, body: Data()); return }
        guard !path.contains("\0"), !path.contains("\\") else { respond(connection, status: 404, body: Data()); return }
        let file = root.appendingPathComponent(pieces.joined(separator: "/")).resolvingSymlinksInPath()
        guard file.path.hasPrefix(root.resolvingSymlinksInPath().path + "/"), let data = try? Data(contentsOf: file) else { respond(connection, status: 404, body: Data()); return }
        let types = ["html": "text/html; charset=utf-8", "js": "text/javascript; charset=utf-8", "mjs": "text/javascript; charset=utf-8", "css": "text/css; charset=utf-8", "json": "application/json; charset=utf-8", "wasm": "application/wasm", "svg": "image/svg+xml", "png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "gif": "image/gif", "woff": "font/woff", "woff2": "font/woff2", "zip": "application/zip"]
        respond(connection, type: types[file.pathExtension] ?? "application/octet-stream", body: data, head: head)
    }
}

final class MetadataProxy: NSObject, URLSessionTaskDelegate {
    static func allowed(_ url: URL) -> Bool {
        url.scheme == "https" && url.host == "kenkoooo.com" && (url.port == nil || url.port == 443) && url.user == nil && url.password == nil && url.fragment == nil && !url.absoluteString.contains("\\") && !url.path.contains("\0") && !url.path.split(separator: "/").contains(where: { $0 == "." || $0 == ".." }) && (url.path.hasPrefix("/atcoder/resources/") || url.path.hasPrefix("/atcoder/atcoder-api/"))
    }
    static func fetch(_ url: URL, completion: @escaping (Data?) -> Void) {
        let session = URLSession(configuration: .ephemeral, delegate: MetadataProxy(), delegateQueue: nil)
        var request = URLRequest(url: url, timeoutInterval: 20)
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        session.dataTask(with: request) { data, response, error in
            defer { session.finishTasksAndInvalidate() }
            guard error == nil, let response = response as? HTTPURLResponse, response.statusCode == 200,
                  let data = data, data.count <= 16_000_000, (try? JSONSerialization.jsonObject(with: data)) != nil else { completion(nil); return }
            completion(data)
        }.resume()
    }
    func urlSession(_ session: URLSession, task: URLSessionTask, willPerformHTTPRedirection response: HTTPURLResponse, newRequest request: URLRequest, completionHandler: @escaping (URLRequest?) -> Void) {
        completionHandler(request.url.map(Self.allowed) == true ? request : nil)
    }
}

final class AppDelegate: NSObject, NSApplicationDelegate, WKNavigationDelegate, WKUIDelegate, WKScriptMessageHandler {
    var window: NSWindow!
    var webView: WKWebView!
    var server: LocalServer!
    let runtimeTest = CommandLine.arguments.contains("--runtime-test") || CommandLine.arguments.contains("--network-test")
    let networkTest = CommandLine.arguments.contains("--network-test")
    let lifecycleTest = CommandLine.arguments.contains("--lifecycle-test")
    let storageWrite = CommandLine.arguments.contains("--storage-test-write")
    let storageRead = CommandLine.arguments.contains("--storage-test-read")
    let storageClear = CommandLine.arguments.contains("--storage-test-clear")
    let storageEmpty = CommandLine.arguments.contains("--storage-test-empty")
    let storageMigrate = CommandLine.arguments.contains("--storage-test-migrate")
    var storageTest: Bool { storageWrite || storageRead || storageClear || storageEmpty || storageMigrate }
    var testMode: Bool { runtimeTest || storageTest || lifecycleTest }
    var didRunTest = false
    var finishedTest = false
    var testExitCode: Int32 = 0
    var processRecoveries = 0
    var activationObserver: NSObjectProtocol?
    let activationName = Notification.Name("org.cipractice.activate")
    var durableStorage: DurableStorage?

    func applicationDidFinishLaunching(_ notification: Notification) {
        if !testMode, let identifier = Bundle.main.bundleIdentifier,
           let existing = NSRunningApplication.runningApplications(withBundleIdentifier: identifier).first(where: { $0.processIdentifier != ProcessInfo.processInfo.processIdentifier }) {
            DistributedNotificationCenter.default().post(name: activationName, object: nil)
            existing.activate(options: [.activateAllWindows, .activateIgnoringOtherApps])
            NSApp.terminate(nil)
            return
        }
        activationObserver = DistributedNotificationCenter.default().addObserver(forName: activationName, object: nil, queue: .main) { [weak self] _ in
            guard let self = self else { return }
            if self.lifecycleTest { self.finishTest(["ok": true, "check": "second launch activates existing process"]) }
            else { self.showWindow() }
        }
        if testMode {
            DispatchQueue.main.asyncAfter(deadline: .now() + 90) { [weak self] in
                self?.finishTest(["ok": false, "error": "Native integration test exceeded 90 seconds"])
            }
        }
        createMenu()
        let configuration = WKWebViewConfiguration()
        // Integration tests must never read or mutate the user's practice records.
        configuration.websiteDataStore = testMode ? .nonPersistent() : .default()
        if !testMode || storageTest {
            do {
                let directory: URL
                if storageTest {
                    guard let path = ProcessInfo.processInfo.environment["CI_NATIVE_STORAGE_DIR"], !path.isEmpty else {
                        throw NSError(domain: "CIPracticeStorage", code: 4, userInfo: [NSLocalizedDescriptionKey: "Storage tests require an isolated CI_NATIVE_STORAGE_DIR."])
                    }
                    directory = URL(fileURLWithPath: path, isDirectory: true)
                } else {
                    directory = try FileManager.default.url(for: .applicationSupportDirectory, in: .userDomainMask, appropriateFor: nil, create: true).appendingPathComponent("org.cipractice.desktop", isDirectory: true)
                }
                let keys: Set<String> = storageTest ? ["ci-practice-runtime-storage-probe"] : ["ciPracticeHubState.v1", "ciPracticeHubState.v2"]
                let storage = try DurableStorage(directory: directory, keys: keys)
                durableStorage = storage
                let payload: [String: Any] = ["keys": keys.sorted()]
                let json = String(decoding: try JSONSerialization.data(withJSONObject: payload), as: UTF8.self)
                guard let bridgeURL = Bundle.main.resourceURL?.appendingPathComponent("storage-bridge.js") else { throw CocoaError(.fileNoSuchFile) }
                let bridge = try String(contentsOf: bridgeURL, encoding: .utf8)
                let migration = storageMigrate ? "localStorage.setItem('ci-practice-runtime-storage-probe', 'persisted');\n" : ""
                configuration.userContentController.addUserScript(WKUserScript(source: migration + "window.__ciNativeStorage = \(json);\n" + bridge, injectionTime: .atDocumentStart, forMainFrameOnly: true))
            } catch {
                if testMode { finishTest(["ok": false, "error": error.localizedDescription]); return }
                let alert = NSAlert(error: error)
                alert.messageText = "Practice records could not be opened"
                alert.runModal()
                NSApp.terminate(nil)
                return
            }
        }
        configuration.userContentController.addUserScript(WKUserScript(source: "window.__ciNetworkTest = \(networkTest ? "true" : "false");", injectionTime: .atDocumentStart, forMainFrameOnly: true))
        configuration.userContentController.add(self, name: "saveFile")
        configuration.userContentController.add(self, name: "runtimeTest")
        configuration.preferences.javaScriptCanOpenWindowsAutomatically = true
        webView = WKWebView(frame: .zero, configuration: configuration)
        let savedZoom = UserDefaults.standard.double(forKey: "CIPracticePageZoom")
        webView.pageZoom = savedZoom >= 0.75 && savedZoom <= 1.75 ? savedZoom : 1
        webView.navigationDelegate = self
        webView.uiDelegate = self
        if #available(macOS 13.3, *) { webView.isInspectable = runtimeTest }
        window = NSWindow(contentRect: NSRect(x: 0, y: 0, width: 1320, height: 860), styleMask: [.titled, .closable, .miniaturizable, .resizable], backing: .buffered, defer: false)
        window.title = "CI Practice"
        window.minSize = NSSize(width: 860, height: 600)
        window.contentView = webView
        window.center()
        window.setFrameAutosaveName("CI Practice Main Window")
        showWindow()
        guard let resource = Bundle.main.resourceURL else { fatalError("Missing application resources") }
        server = LocalServer(root: resource.appendingPathComponent("site"), testPage: testMode)
        server.start(ready: {
            let path = self.storageTest || self.lifecycleTest ? "/__storage-test" : "/"
            self.webView.load(URLRequest(url: URL(string: "http://127.0.0.1:\(self.server.port)\(path)")!))
        }, failed: { message in
            if self.testMode { self.finishTest(["ok": false, "error": "Local server failed: " + message]); return }
            let alert = NSAlert()
            alert.messageText = "CI Practice could not start"
            alert.informativeText = "Port 18765 is unavailable. Close any previous CI Practice instance and open the app again.\n\n\(message)"
            alert.runModal()
            NSApp.terminate(nil)
        })
    }

    func createMenu() {
        let main = NSMenu()
        let appItem = NSMenuItem(); main.addItem(appItem)
        let appMenu = NSMenu(); appItem.submenu = appMenu
        appMenu.addItem(withTitle: "About CI Practice", action: #selector(NSApplication.orderFrontStandardAboutPanel(_:)), keyEquivalent: "")
        appMenu.addItem(.separator())
        appMenu.addItem(withTitle: "Hide CI Practice", action: #selector(NSApplication.hide(_:)), keyEquivalent: "h")
        let hideOthers = appMenu.addItem(withTitle: "Hide Others", action: #selector(NSApplication.hideOtherApplications(_:)), keyEquivalent: "h")
        hideOthers.keyEquivalentModifierMask = [.command, .option]
        appMenu.addItem(withTitle: "Show All", action: #selector(NSApplication.unhideAllApplications(_:)), keyEquivalent: "")
        appMenu.addItem(.separator())
        appMenu.addItem(withTitle: "Quit CI Practice", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        let editItem = NSMenuItem(); main.addItem(editItem)
        let editMenu = NSMenu(title: "Edit"); editItem.submenu = editMenu
        for (title, action, key) in [("Undo", "undo:", "z"), ("Cut", "cut:", "x"), ("Copy", "copy:", "c"), ("Paste", "paste:", "v"), ("Select All", "selectAll:", "a")] {
            editMenu.addItem(withTitle: title, action: Selector(action), keyEquivalent: key)
        }
        let redo = NSMenuItem(title: "Redo", action: NSSelectorFromString("redo:"), keyEquivalent: "z")
        redo.keyEquivalentModifierMask = [.command, .shift]; editMenu.insertItem(redo, at: 1)
        let viewItem = NSMenuItem(); main.addItem(viewItem)
        let viewMenu = NSMenu(title: "View"); viewItem.submenu = viewMenu
        let back = viewMenu.addItem(withTitle: "Back", action: #selector(goBack), keyEquivalent: "["); back.target = self
        let forward = viewMenu.addItem(withTitle: "Forward", action: #selector(goForward), keyEquivalent: "]"); forward.target = self
        let reload = viewMenu.addItem(withTitle: "Reload", action: #selector(reloadPage), keyEquivalent: "r"); reload.target = self
        viewMenu.addItem(.separator())
        for (title, selector, key) in [("Zoom In", #selector(zoomIn), "+"), ("Zoom Out", #selector(zoomOut), "-"), ("Actual Size", #selector(resetZoom), "0")] {
            let item = viewMenu.addItem(withTitle: title, action: selector, keyEquivalent: key); item.target = self
        }
        let fullscreen = viewMenu.addItem(withTitle: "Enter Full Screen", action: #selector(NSWindow.toggleFullScreen(_:)), keyEquivalent: "f")
        fullscreen.keyEquivalentModifierMask = [.command, .control]
        let windowItem = NSMenuItem(); main.addItem(windowItem)
        let windowMenu = NSMenu(title: "Window"); windowItem.submenu = windowMenu
        windowMenu.addItem(withTitle: "Minimize", action: #selector(NSWindow.performMiniaturize(_:)), keyEquivalent: "m")
        windowMenu.addItem(withTitle: "Zoom", action: #selector(NSWindow.performZoom(_:)), keyEquivalent: "")
        NSApp.windowsMenu = windowMenu
        NSApp.mainMenu = main
    }
    func showWindow() {
        guard let window = window else { return }
        window.deminiaturize(nil)
        window.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
    }
    func applicationShouldHandleReopen(_ sender: NSApplication, hasVisibleWindows flag: Bool) -> Bool { showWindow(); return true }
    func setZoom(_ value: Double) {
        webView.pageZoom = min(1.75, max(0.75, value))
        UserDefaults.standard.set(webView.pageZoom, forKey: "CIPracticePageZoom")
    }
    @objc func zoomIn() { setZoom(webView.pageZoom + 0.1) }
    @objc func zoomOut() { setZoom(webView.pageZoom - 0.1) }
    @objc func resetZoom() { setZoom(1) }
    @objc func goBack() { webView.goBack() }
    @objc func goForward() { webView.goForward() }
    @objc func reloadPage() { webView.reload() }
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool { true }
    func applicationWillTerminate(_ notification: Notification) {
        server?.listener?.cancel()
        if let observer = activationObserver { DistributedNotificationCenter.default().removeObserver(observer) }
    }
    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        if testMode { finishTest(["ok": false, "error": "WebKit content process terminated"]); return }
        processRecoveries += 1
        if processRecoveries <= 2 { webView.reload() }
        else {
            let alert = NSAlert(); alert.messageText = "The workspace needs to reload"
            alert.informativeText = "Your saved practice records are kept on this Mac. Close and reopen CI Practice to continue."
            alert.beginSheetModal(for: window)
        }
    }
    func finishTest(_ result: [String: Any]) {
        guard !finishedTest else { return }; finishedTest = true
        testExitCode = result["ok"] as? Bool == true ? 0 : 1
        let data = (try? JSONSerialization.data(withJSONObject: result, options: [.sortedKeys])) ?? Data("{}".utf8)
        print(String(decoding: data, as: UTF8.self)); fflush(stdout)
        // Successful storage mutations already have a durable native acknowledgment.
        DispatchQueue.main.async {
            self.server?.listener?.cancel()
            NSApp.stop(nil)
            if let event = NSEvent.otherEvent(with: .applicationDefined, location: .zero, modifierFlags: [], timestamp: 0, windowNumber: 0, context: nil, subtype: 0, data1: 0, data2: 0) { NSApp.postEvent(event, atStart: true) }
        }
    }

    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = navigationAction.request.url else { decisionHandler(.cancel); return }
        if url.scheme == "http", url.host == "127.0.0.1", url.port == Int(server.port) { decisionHandler(.allow); return }
        if ["https", "http"].contains(url.scheme ?? "") { NSWorkspace.shared.open(url) }
        decisionHandler(.cancel)
    }
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let url = navigationAction.request.url, ["http", "https"].contains(url.scheme ?? "") { NSWorkspace.shared.open(url) }
        return nil
    }
    func webView(_ webView: WKWebView, runOpenPanelWith parameters: WKOpenPanelParameters, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping ([URL]?) -> Void) {
        let panel = NSOpenPanel()
        panel.allowsMultipleSelection = parameters.allowsMultipleSelection
        panel.canChooseDirectories = parameters.allowsDirectories
        panel.beginSheetModal(for: window) { response in completionHandler(response == .OK ? panel.urls : nil) }
    }
    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        let alert = NSAlert(); alert.messageText = "CI Practice"; alert.informativeText = message
        alert.beginSheetModal(for: window) { _ in completionHandler() }
    }
    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        let alert = NSAlert(); alert.messageText = "CI Practice"; alert.informativeText = message
        alert.addButton(withTitle: "OK"); alert.addButton(withTitle: "Cancel")
        alert.beginSheetModal(for: window) { response in completionHandler(response == .alertFirstButtonReturn) }
    }
    func webView(_ webView: WKWebView, runJavaScriptTextInputPanelWithPrompt prompt: String, defaultText: String?, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (String?) -> Void) {
        guard prompt == "__CI_NATIVE_STORAGE_V1__", webView === self.webView, frame.isMainFrame,
              frame.securityOrigin.protocol == "http", frame.securityOrigin.host == "127.0.0.1", frame.securityOrigin.port == 18765,
              let storage = durableStorage else { completionHandler(nil); return }
        do {
            guard let text = defaultText, text.utf8.count <= 60_000_000, let data = text.data(using: .utf8),
                  let envelope = try JSONSerialization.jsonObject(with: data) as? [String: Any] else { throw CocoaError(.propertyListReadCorrupt) }
            if envelope["operation"] as? String == "read" {
                let response: [String: Any] = ["ok": true, "values": storage.values as Any? ?? NSNull()]
                let result = try JSONSerialization.data(withJSONObject: response)
                completionHandler(String(decoding: result, as: UTF8.self))
                return
            }
            guard envelope["operation"] as? String == "write", let values = envelope["values"] as? [String: String] else { throw CocoaError(.propertyListReadCorrupt) }
            try storage.commit(values)
            completionHandler("{\"ok\":true}")
        } catch {
            let result = (try? JSONSerialization.data(withJSONObject: ["ok": false, "error": error.localizedDescription])) ?? Data("{\"ok\":false}".utf8)
            completionHandler(String(decoding: result, as: UTF8.self))
        }
    }
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "runtimeTest", runtimeTest {
            guard let text = message.body as? String, let data = text.data(using: .utf8),
                  let result = (try? JSONSerialization.jsonObject(with: data)) as? [String: Any] else {
                finishTest(["ok": false, "error": "Invalid integration-test result"]); return
            }
            finishTest(result); return
        }
        guard message.name == "saveFile", message.frameInfo.isMainFrame,
              let body = message.body as? [String: Any], let content = body["content"] as? String,
              content.utf8.count <= 25_000_000, let name = body["filename"] as? String else { return }
        let panel = NSSavePanel(); panel.nameFieldStringValue = URL(fileURLWithPath: name).lastPathComponent
        panel.beginSheetModal(for: window) { response in
            guard response == .OK, let url = panel.url else { return }
            do { try content.write(to: url, atomically: true, encoding: .utf8) }
            catch { let alert = NSAlert(error: error); alert.beginSheetModal(for: self.window) }
        }
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        if !testMode {
            webView.evaluateJavaScript("window.__ciNativeStorageReady === true") { value, error in
                guard error != nil || value as? Bool != true else { return }
                self.webView.isHidden = true
                let alert = NSAlert()
                alert.messageText = "Practice records could not be saved"
                alert.informativeText = "The local storage connection did not initialize. Existing snapshots have been retained. Close the app, check available disk space and folder permissions, then reopen it."
                alert.beginSheetModal(for: self.window) { _ in NSApp.terminate(nil) }
            }
        }
        if storageTest {
            guard !didRunTest else { return }; didRunTest = true
            let script: String
            if storageWrite { script = "localStorage.setItem('ci-practice-runtime-storage-probe', 'persisted'); localStorage.getItem('ci-practice-runtime-storage-probe') === 'persisted'" }
            else if storageClear { script = "localStorage.clear(); localStorage.getItem('ci-practice-runtime-storage-probe') === null" }
            else if storageEmpty { script = "localStorage.getItem('ci-practice-runtime-storage-probe') === null" }
            else if storageMigrate { script = "localStorage.getItem('ci-practice-runtime-storage-probe') === 'persisted'" }
            else { script = "(() => { const ok = localStorage.getItem('ci-practice-runtime-storage-probe') === 'persisted'; localStorage.removeItem('ci-practice-runtime-storage-probe'); return ok; })()" }
            webView.evaluateJavaScript("if (window.__ciNativeStorageReady !== true) throw new Error('Native storage bridge did not initialize');\n" + script) { value, error in
                self.finishTest(["ok": error == nil && value as? Bool == true, "check": self.storageWrite ? "persistent store write" : "persistent store survives application restart", "error": error?.localizedDescription ?? ""])
            }
            return
        }
        guard runtimeTest, !didRunTest else { return }; didRunTest = true
        guard let scriptURL = Bundle.main.resourceURL?.appendingPathComponent("runtime-test.js"), let script = try? String(contentsOf: scriptURL, encoding: .utf8) else { finishTest(["ok": false, "error": "Missing test harness"]); return }
        webView.evaluateJavaScript(script + "\nvoid 0;") { _, error in
            if let error = error { self.finishTest(["ok": false, "error": error.localizedDescription]) }
        }
    }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.setActivationPolicy(.regular)
app.run()
exit(delegate.testExitCode)
