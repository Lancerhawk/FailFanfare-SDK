# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2026-03-02

### Added

- Hybrid SDK: browser mode (existing) + new Node CLI mode.
- CLI wraps any dev-server command (`npx failfanfare next dev`).
- Sound triggers on dev-server startup, crash, and unclean exit.
- `src/cli/` with `index.ts` and `watcher.ts`.
- `src/shared/audio.player.ts` for Node-compatible OS audio playback.
- Split tsup build into 3 configs: browser, adapters, CLI.
- MP3 sounds now copied to `dist/sounds/` for CLI use.

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
