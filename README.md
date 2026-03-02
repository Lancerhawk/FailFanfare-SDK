# FailFanfare

> The ultimate debugging companion that turns "Oh No!" into "Oh My God Wow!"

FailFanfare is a premium, developer-centric feedback system that provides auditory cues during your development workflow. It bridges the gap between your browser and your terminal, ensuring you never miss a silent error or a successful build again.

---

## Architecture Overview

FailFanfare operates as a **Hybrid SDK**, monitoring both your frontend application and your development server.

```mermaid
graph TD
    User([Developer]) --> CLI[failfanfare CLI]
    CLI --> SubProcess[Dev Server: Vite/Next/Yarn]
    SubProcess --> Terminal[Terminal Output]
    
    subgraph "Terminal Monitoring"
        CLI -- "Stdout/Stderr Pipe" --> Monitor[Watcher]
        Monitor -- "Success/Error Keywords" --> NodePlayer[OS Audio: afplay/powershell]
    end

    subgraph "Browser Runtime"
        App[React/Vue/Angular App] --> FF[FailFanfare SDK]
        FF -- "Error Events" --> BrowserPlayer[Browser Audio API]
        FF -- "Config Discovery" --> Config[package.json / config.json]
    end

    Terminal -- "Errors/Success" --> CLI
```

---

## Key Features

### Hybrid CLI Wrapper
Wraps any command (e.g., `npx failfanfare npm run dev`) to provide instant audio feedback when your server starts, crashes, or encounters compilation errors.

### Cross-Framework SDK
First-class support for **React**, **Vue 3**, **Angular**, and **Vanilla JS**. It hooks into global error handlers and `console.error` to notify you of issues even when the browser tab is hidden.

### Smart Escalation
If errors start spamming (5+ in a short window), the sound escalates to a "Critical Error" state—perfect for catching infinite loops or major system failures early.

### Unified Configuration
Configure once in your `package.json`. Both the CLI and your frontend code will automatically synchronize to use the same custom mapping.

### Performance Optimized
- **Browser**: Ultralight (4KB) bundle. Sounds are hosted on a global CDN to prevent slowing down your HMR.
- **Node**: Direct native OS integration—no bulky dependencies.

---

## Project Structure

- [**failfanfare_sdk/**](./failfanfare_sdk/) — The core logic, adapters, and CLI binary.
- [**webapp/**](./webapp/) — A full-featured demonstration playground.
- [**examples/**](./examples/) — Quick-start templates for React and other frameworks.

---

## Configuration Flow

```mermaid
sequenceDiagram
    participant P as package.json
    participant C as failfanfare.config.json
    participant F as CLI Flags (--success)
    participant FF as FailFanfare CLI

    P ->> FF: Load defaults
    C ->> FF: Merge overrides
    F ->> FF: Apply final overrides
    FF ->> FF: Execute Command + Listen
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

MIT © Lancerhawk
