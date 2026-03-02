# failfanfare SDK

<div align="center">
  <img src="./media/logo.svg" width="120" />
</div>

> Transform your development experience with real-time auditory feedback.

[![npm version](https://img.shields.io/npm/v/failfanfare)](https://www.npmjs.com/package/failfanfare)
[![license](https://img.shields.io/npm/l/failfanfare)](./LICENSE)

FailFanfare is a fun dual-mode SDK that plays sound effects in response to terminal and browser events. It's designed to keep you focused, entertained, and instantly aware of build failures or runtime crashes with a bit of humor.

---

## CLI Mode (Terminal)

The CLI acts as a wrapper around your dev server. It pipes the output and watches for specific signals to play sounds.

### Usage

```bash
npx failfanfare <your-command>
```

### Examples

- `npx failfanfare npm run dev`
- `npx failfanfare vite`
- `npx failfanfare next dev`

### What it detects:

- **Success**: "ready", "compiled successfully", "local:".
- **Errors**: Syntax errors, unhandled exceptions, and invalid dependencies.
- **Crashes**: When the sub-process exits with a non-zero code.

---

## Browser Mode (Integration)

Seamlessly integrate FailFanfare into any web application. It automatically shuts down in production.

### Installation

```bash
npm install failfanfare
```

### Framework Integration

#### React

```tsx
import { useFailFanfare } from "failfanfare/react";

function App() {
  useFailFanfare({
    watchConsole: true, // Listen to console.error
    enableSuccessSound: true, // Play sound on initial load
  });

  return <Layout>...</Layout>;
}
```

#### Vue 3

```vue
<script setup lang="ts">
import { useFailFanfare } from "failfanfare/vue";
useFailFanfare({ watchConsole: true });
</script>
```

#### Angular

```ts
import { FailFanfareService } from "failfanfare/angular";

@Component({...})
export class AppComponent implements OnInit {
  constructor(private fanfare: FailFanfareService) {}
  ngOnInit() {
    this.fanfare.init({ volume: 0.5 });
  }
}
```

#### Vanilla JS

```ts
import { initFailFanfare } from "failfanfare";
initFailFanfare();
```

---

## Advanced Customization

### Option 1: CLI Flags (ad-hoc)

```bash
npx failfanfare --success ./win.mp3 --error ./fail.mp3 npm run dev
```

### Option 2: Unified Configuration (Recommended)

Add a `failfanfare` field to your `package.json` at the project root. This configuration works for **both** the CLI and the Browser.

```json
{
  "failfanfare": {
    "sounds": {
      "success": "./public/custom-win.mp3",
      "error": "./public/custom-error.mp3",
      "critical": "./public/custom-crash.mp3"
    }
  }
}
```

**Pro Tip**: In your code, you can import your `package.json` to keep sounds perfectly in sync:

```tsx
import pkg from "../package.json";
useFailFanfare({ sounds: pkg.failfanfare });
```

---

## Configuration Reference

| Property             | Type      | Default | Description                       |
| :------------------- | :-------- | :------ | :-------------------------------- |
| `enabled`            | `boolean` | `true`  | Force disable the SDK.            |
| `volume`             | `number`  | `0.7`   | Sound volume (0.0 to 1.0).        |
| `throttleMs`         | `number`  | `2000`  | Prevention of sound overlapping.  |
| `watchConsole`       | `boolean` | `false` | Trigger sound on `console.error`. |
| `enableSuccessSound` | `boolean` | `false` | Play a startup sound.             |
| `sounds`             | `object`  | `{}`    | Mappings for custom MP3 paths.    |

### Sound Event Mapping

| Event Key  | Browser Trigger          | CLI Trigger            |
| :--------- | :----------------------- | :--------------------- |
| `success`  | Initial page load        | Build success keywords |
| `error`    | `console.error` fallback | Error keywords in logs |
| `runtime`  | Global JS exceptions     | Fallback for `error`   |
| `promise`  | Unhandled rejections     | Fallback for `error`   |
| `critical` | Rapid error spam (5+)    | Process crash/exit     |

---

## Build and Architecture

FailFanfare uses a sophisticated split build system powered by `tsup`:

- **CLI**: Native Node.js build with OS-level audio routing.
- **Browser**: Treeshakeable ESM/CJS build with CDN-backed assets.
- **Adapters**: Lightweight framework wrappers.

---

MIT © Lancerhawk
