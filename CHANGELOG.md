# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2026-03-02

### Added

- **Unified Configuration**: CLI now discovers settings in `package.json` or `failfanfare.config.json`.
- **Custom Sound Support**: Use your own MP3 files for all events in CLI and Browser.
- **Windows Audio Fix**: Native MP3 support via PowerShell `MediaPlayer` (rock-solid).
- **Diagnostic Logging**: CLI logs `[failfanfare] 🎺 Playing Sound...` for detection proof.
- **Key Parity**: CLI understands browser keys (`runtime`, `console`, `promise`) for zero-manual-config.

### Fixed

- Fixed CLI audio loop bug on single errors.
- Fixed process exit race condition on crash (added 2s audio delay).

## [0.2.0] - 2026-03-02

### Added

- Hybrid SDK: Browser mode + new Node CLI mode.
- CLI wraps any dev-server command (`npx failfanfare next dev`).
- Native OS audio playback for Node.js (aplay, afplay, powershell).
- Refactored project structure: `src/browser`, `src/cli`, `src/shared`.
- Optimized browser bundle: moved assets to CDN (220KB -> 4KB).

## [0.1.0] - 2026-03-02

### Added

- Created `failfanfare_sdk` supporting React, Vue, Angular, and Vanilla JS.
- Implemented core SDK logic for runtime errors, promise rejections, and console errors.
- Embedded built-in MP3 sounds (base64) for zero-latency feedback.
- Added throttle and escalation ("critical") sound support.
- Configured project-wide linting with ESLint and Prettier.

### Changed

- Cleaned all SDK source files by removing internal comments for a production-ready look.

## [0.0.0] - 2026-03-02

### Added

- Initial project structure and specification.
