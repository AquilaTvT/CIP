#!/usr/bin/env swift
// Rebuild the app icon directly from assets/plume.svg. No external packages.
// Usage on macOS: swift scripts/build_icon.swift
import Foundation
import AppKit
import ImageIO
import UniformTypeIdentifiers

enum IconError: Error, CustomStringConvertible {
    case invalid(String)
    var description: String { switch self { case .invalid(let message): return message } }
}

struct Shape { let element: String; let attributes: [String: String] }

final class SVGReader: NSObject, XMLParserDelegate {
    var shapes: [Shape] = []
    var viewBox: [Double] = []
    var error: Error?
    func parser(_ parser: XMLParser, didStartElement name: String, namespaceURI: String?, qualifiedName: String?, attributes: [String: String]) {
        switch name {
        case "svg": viewBox = (attributes["viewBox"] ?? "").split(separator: " ").compactMap { Double($0) }
        case "rect", "path": shapes.append(Shape(element: name, attributes: attributes))
        default: error = IconError.invalid("Unsupported SVG element: \(name)"); parser.abortParsing()
        }
    }
}

func color(_ value: String?) throws -> CGColor? {
    guard let value = value, value != "none" else { return nil }
    guard value.hasPrefix("#"), value.count == 7, let hex = UInt32(value.dropFirst(), radix: 16) else {
        throw IconError.invalid("Only six-digit SVG colors are supported: \(value)")
    }
    return CGColor(colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!, components: [CGFloat((hex >> 16) & 255) / 255, CGFloat((hex >> 8) & 255) / 255, CGFloat(hex & 255) / 255, 1])!
}

func svgPath(_ source: String) throws -> CGPath {
    let regex = try NSRegularExpression(pattern: "[A-Za-z]|[-+]?(?:[0-9]*\\.)?[0-9]+(?:[eE][-+]?[0-9]+)?")
    let tokens = regex.matches(in: source, range: NSRange(source.startIndex..., in: source)).map { String(source[Range($0.range, in: source)!]) }
    let path = CGMutablePath()
    var cursor = 0
    var command = ""
    func number() throws -> CGFloat {
        guard cursor < tokens.count, let value = Double(tokens[cursor]), value.isFinite else { throw IconError.invalid("Invalid SVG path number") }
        cursor += 1; return CGFloat(value)
    }
    func point() throws -> CGPoint { CGPoint(x: try number(), y: try number()) }
    while cursor < tokens.count {
        if tokens[cursor].first?.isLetter == true { command = tokens[cursor]; cursor += 1 }
        switch command {
        case "M": path.move(to: try point()); command = "L"
        case "L": path.addLine(to: try point())
        case "C":
            let control1 = try point(), control2 = try point(), end = try point()
            path.addCurve(to: end, control1: control1, control2: control2)
        case "Z", "z": path.closeSubpath(); command = ""
        default: throw IconError.invalid("Unsupported SVG path command: \(command)")
        }
    }
    return path
}

func render(_ shapes: [Shape], viewBox: [Double], size: Int) throws -> Data {
    guard let context = CGContext(data: nil, width: size, height: size, bitsPerComponent: 8, bytesPerRow: 0,
                                  space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else {
        throw IconError.invalid("Cannot allocate icon bitmap")
    }
    context.setAllowsAntialiasing(true)
    context.setShouldAntialias(true)
    context.translateBy(x: 0, y: CGFloat(size))
    context.scaleBy(x: CGFloat(size) / viewBox[2], y: -CGFloat(size) / viewBox[3])
    context.translateBy(x: -viewBox[0], y: -viewBox[1])
    for shape in shapes {
        let attributes = shape.attributes
        let path: CGPath
        if shape.element == "rect" {
            func value(_ key: String, fallback: Double = 0) -> CGFloat { CGFloat(Double(attributes[key] ?? "") ?? fallback) }
            path = CGPath(roundedRect: CGRect(x: value("x"), y: value("y"), width: value("width"), height: value("height")),
                          cornerWidth: value("rx"), cornerHeight: value("ry", fallback: Double(attributes["rx"] ?? "") ?? 0), transform: nil)
        } else { path = try svgPath(attributes["d"] ?? "") }
        if let fill = try color(attributes["fill"]) {
            context.addPath(path); context.setFillColor(fill); context.fillPath()
        }
        if let stroke = try color(attributes["stroke"]) {
            context.addPath(path); context.setStrokeColor(stroke)
            context.setLineWidth(CGFloat(Double(attributes["stroke-width"] ?? "1") ?? 1))
            context.setLineCap(attributes["stroke-linecap"] == "round" ? .round : .butt)
            context.setLineJoin(.miter); context.strokePath()
        }
    }
    let data = NSMutableData()
    guard let image = context.makeImage(), let destination = CGImageDestinationCreateWithData(data, UTType.png.identifier as CFString, 1, nil) else {
        throw IconError.invalid("Cannot encode icon bitmap")
    }
    CGImageDestinationAddImage(destination, image, nil)
    guard CGImageDestinationFinalize(destination) else { throw IconError.invalid("Cannot finish PNG encoding") }
    return data as Data
}

do {
    let root = URL(fileURLWithPath: #filePath).standardizedFileURL.deletingLastPathComponent().deletingLastPathComponent()
    let svg = try Data(contentsOf: root.appendingPathComponent("assets/plume.svg"))
    let reader = SVGReader(), parser = XMLParser(data: svg)
    parser.delegate = reader
    guard parser.parse(), reader.viewBox.count == 4, reader.viewBox[2] > 0, reader.viewBox[3] > 0 else {
        throw reader.error ?? parser.parserError ?? IconError.invalid("Invalid SVG viewBox")
    }
    let temporary = FileManager.default.temporaryDirectory.appendingPathComponent("plume-icon-\(UUID().uuidString)", isDirectory: true)
    try FileManager.default.createDirectory(at: temporary, withIntermediateDirectories: true)
    var succeeded = false
    defer { if succeeded { try? FileManager.default.removeItem(at: temporary) } }
    let iconset = temporary.appendingPathComponent("Plume.iconset", isDirectory: true)
    try FileManager.default.createDirectory(at: iconset, withIntermediateDirectories: true)
    var images: [Int: Data] = [:]
    for logical in [16, 32, 128, 256, 512] {
        for scale in [1, 2] {
            let size = logical * scale
            if images[size] == nil { images[size] = try render(reader.shapes, viewBox: reader.viewBox, size: size) }
            let filename = "icon_\(logical)x\(logical)\(scale == 2 ? "@2x" : "").png"
            try images[size]!.write(to: iconset.appendingPathComponent(filename), options: .atomic)
        }
    }
    let process = Process()
    process.executableURL = URL(fileURLWithPath: "/usr/bin/iconutil")
    process.arguments = ["-c", "icns", iconset.path, "-o", temporary.appendingPathComponent("CIPractice.icns").path]
    try process.run(); process.waitUntilExit()
    guard process.terminationStatus == 0 else { throw IconError.invalid("iconutil failed; generated PNGs retained at \(iconset.path)") }
    try Data(contentsOf: temporary.appendingPathComponent("CIPractice.icns")).write(to: root.appendingPathComponent("CIPractice.icns"), options: .atomic)
    try images[1024]!.write(to: root.appendingPathComponent("assets/plume-icon.png"), options: .atomic)
    succeeded = true
    print("Generated CIPractice.icns and assets/plume-icon.png from assets/plume.svg")
} catch {
    FileHandle.standardError.write(Data("Icon build failed: \(error)\n".utf8))
    exit(1)
}
