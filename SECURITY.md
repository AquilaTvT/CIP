# Security

Plume is a personal practice application. Python runs in a browser Web Worker on WebAssembly; neither `start.py` nor the macOS app executes submitted code on the host operating system. The local servers listen on the loopback interface only and serve an explicit list of files; do not expose them on a public interface.

Problem statements, including those in imported problem packs, are sanitized before display, and imported backups and packs are validated before anything is stored. Even so, import backups and packs only from sources you trust: a pack's reference solutions and data are shown to you as they were written.

Please report security issues privately through the repository owner's GitHub profile before opening a public issue with sensitive details.
