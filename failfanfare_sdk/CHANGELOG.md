# Changelog

All notable changes to this project will be documented in this file.

## [0.3.1] - 2026-03-02

### Added

- **Nested Config Support**: CLI and Browser now support a `sounds` sub-object in `package.json` for cleaner organization.
- **Visual Overhaul**: Documentation site (`webapp`) revised for fluid responsive behavior across all breakpoints.
- **Fun Visuals**: 180+ micro-particles with ambient drift and glow for a dynamic aesthetic.

### Fixed

- **TS Coordinate Logic**: Fixed coordinate property errors in the particle background system.
- **CLI Arg Parsing**: Refined flag detection to prevent conflicts with sub-shell commands.

## [0.3.0] - 2026-03-02

### Added

- **Unified Configuration**: CLI now automatically discovers settings in `package.json` or `failfanfare.config.json`.
- **Custom Sound Support**: Users can now provide their own MP3 files for all events in both Browser and CLI modes.
- **Key Parity**: CLI now understands browser keys (`runtime`, `console`, `promise`) as fallbacks for error sounds.
- **Improved CLI Robustness**: Added TTY/Color support (`FORCE_COLOR`) so piped processes like Vite still output errors clearly.
- **Faster Windows Audio**: Optimized PowerShell `MediaPlayer` execution for lower latency.
- **Diagnostic Mode**: CLI now logs `[failfanfare] 🎺 Playing Sound...` to confirm detection.

### Fixed

- Fixed CLI "audio loop" bug where a single error would trigger the same sound multiple times.
- Fixed process exit race condition: added 2s delay to ensure crash sounds finish playing.
- Fixed dual-stream monitoring: CLI now watches both `stdout` and `stderr` for errors (Vite support).

## [0.2.0] - 2026-03-02

### Added

- Hybrid SDK: Browser mode + new Node CLI mode.
- CLI wrapper for dev server commands (`npx failfanfare next dev`).
- Native OS audio playback for Node.js (aplay, afplay, powershell).
- Refactored project structure: `src/browser`, `src/cli`, `src/shared`.
- Optimized browser build: moved audio assets to CDN to reduce bundle size from 220KB to 4KB.

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
