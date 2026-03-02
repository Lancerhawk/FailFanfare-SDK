# failfanfare 🎺

> Plays humorous sound effects when runtime errors occur during development.

[![npm version](https://img.shields.io/npm/v/failfanfare)](https://www.npmjs.com/package/failfanfare)
[![license](https://img.shields.io/npm/l/failfanfare)](./LICENSE)

---

## What it does

`failfanfare` listens for browser runtime errors and plays funny MP3 sounds in response — making broken builds a little less painful during development.

**It is unconditionally disabled in production** (checks `NODE_ENV`) and **never runs during SSR** (checks `typeof window`).

---

## Installation

```bash
npm install failfanfare
```

---

## Quick Start

### React

```tsx
// src/App.tsx  (or pages/_app.tsx for Next.js)
import { useFailFanfare } from "failfanfare/react";

export default function App() {
  useFailFanfare();
  return <div>My App</div>;
}
```

### Next.js (App Router)

```tsx
// app/layout.tsx — must be a Client Component
"use client";
import { useFailFanfare } from "failfanfare/react";

export default function RootLayout({ children }) {
  useFailFanfare();
  return <html><body>{children}</body></html>;
}
```

### Vue 3

```vue
<!-- src/App.vue -->
<script setup lang="ts">
import { useFailFanfare } from "failfanfare/vue";
useFailFanfare();
</script>
```

### Angular

```ts
// app.component.ts
import { Component, OnInit } from "@angular/core";
import { FailFanfareService } from "failfanfare/angular";

@Component({ selector: "app-root", templateUrl: "./app.component.html" })
export class AppComponent implements OnInit {
  constructor(private fanfare: FailFanfareService) {}

  ngOnInit(): void {
    this.fanfare.init();
  }
}
```

### Plain HTML (no bundler)

```html
<script src="node_modules/failfanfare/dist/index.global.js"></script>
<script>
  FailFanfare.initFailFanfare();
</script>
```

### Vanilla JS / TypeScript

```ts
import { initFailFanfare } from "failfanfare";
initFailFanfare();
```

---

## Configuration

All options are optional. Defaults are shown below.

```ts
initFailFanfare({
  // Explicitly disable the SDK (even in dev mode).
  enabled: true,

  // Audio volume: 0–1.
  volume: 0.7,

  // Minimum milliseconds between sounds (throttle window).
  // Also controls the rapid-error window for critical escalation.
  throttleMs: 2000,

  // Patch console.error to also trigger the "console" sound.
  watchConsole: false,

  // Play the success sound on page load (fires once).
  enableSuccessSound: false,

  // Override individual sounds with custom file paths or data URIs.
  // Only the keys you provide are replaced; the rest keep defaults.
  sounds: {
    runtime:  "/sounds/my-runtime-sound.mp3",
    promise:  "/sounds/my-promise-sound.mp3",
    console:  "/sounds/my-console-sound.mp3",
    critical: "/sounds/my-critical-sound.mp3",
    success:  "/sounds/my-success-sound.mp3",
  },
});
```

---

## Sound Events

| Event | Trigger | Default Sound |
|-------|---------|---------------|
| `runtime` | `window` error event | aabe_saale.mp3 |
| `promise` | Unhandled promise rejection | bruh.mp3 |
| `console` | `console.error` (opt-in) | eh.mp3 |
| `critical` | 5+ rapid errors in one throttle window | spider_man_32.mp3 |
| `success` | `window.load` — first page load only (opt-in) | oh_my_god_wow.mp3 |

### Critical Escalation

If 5 or more errors fire within a single `throttleMs` window, the next playable sound escalates to `"critical"`. The escalation counter resets after the window expires.

> **Note:** `window.load` does not re-fire on Vite or Next.js HMR. The success sound only plays on the initial full page load — this is expected behaviour.

---

## Guards

FailFanfare checks the following conditions on every `initFailFanfare()` call:

| Guard | Condition |
|-------|-----------|
| Browser check | `typeof window !== "undefined"` |
| Dev check | `process.env.NODE_ENV !== "production"` |
| Enabled flag | `options.enabled !== false` |
| Double-init | Only runs once per page session |

---

## TypeScript

Full type definitions are included. Import types directly:

```ts
import type { FailFanfareOptions, SoundEvent } from "failfanfare";
```

---

## Build Outputs

| File | Format | Use case |
|------|--------|----------|
| `dist/index.js` | ESM | Bundler (Vite, Webpack, Next) |
| `dist/index.cjs` | CJS | CommonJS / older bundlers |
| `dist/index.global.js` | IIFE | Plain `<script>` tag |
| `dist/index.d.ts` | Types | TypeScript |
| `dist/adapters/react.*` | ESM + CJS | React hook |
| `dist/adapters/vue.*` | ESM + CJS | Vue composable |
| `dist/adapters/angular.*` | ESM + CJS | Angular service |

---

## Peer Dependencies

Adapters require the corresponding framework as a peer dependency:

| Adapter | Peer Dependency |
|---------|----------------|
| `failfanfare/react` | `react >= 16` |
| `failfanfare/vue` | `vue >= 3` |
| `failfanfare/angular` | `@angular/core >= 12` |

All peer dependencies are **optional** — only install what you use.

---

## License

MIT © Lancerhawk
