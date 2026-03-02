# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-03-02

### Added

- Full SDK implementation with TypeScript.
- Core runtime logic to detect `window` errors, `unhandledrejection`, and `console.error`.
- Audio utility for safe playback with autoplay handling and volume control.
- Throttle system with rapid-error escalation to "critical" sound.
- SSR-safe guards for Next.js and other server environments.
- Framework adapters for React (`useFailFanfare`), Vue (`useFailFanfare`), and Angular (`FailFanfareService`).
- Base64 MP3 embedding via `tsup` for a self-contained IIFE build.
- Interactive `test.html` example for plain HTML usage.
- Comprehensive documentation in `README.md`.

### Fixed

- Improved `isDev()` check to be more robust in different environments.
- Fixed `process` reference error in browser environments.

## [0.0.0] - 2026-03-02

### Added

- Initial project structure based on specification.
- Built-in MP3 sound assets:
  - `aabe_saale.mp3`
  - `bruh.mp3`
  - `eh.mp3`
  - `oh_my_god_wow.mp3`
  - `spider_man_32.mp3`
- Basic configuration files (`package.json`, `tsconfig.json`, `tsup.config.ts`).
