# FailFanfare

The ultimate fail-detection and sound-feedback system for modern frontend development.

`failfanfare` plays humorous sound effects when runtime errors occur in your frontend applications, turning debugging into a slightly more entertaining experience.

## Project Structure

This repository contains the following components:

- [**failfanfare_sdk/**](./failfanfare_sdk/) — The core TypeScript SDK, supporting React, Vue, Angular, and vanilla JS.
- [**webapp/**](./webapp/) — A demonstration and testing web application.

## Getting Started

To use the SDK in your project, navigate to the `failfanfare_sdk` directory:

```bash
cd failfanfare_sdk
npm install
npm run build
```

Then follow the [SDK README](./failfanfare_sdk/README.md) for detailed integration instructions for your framework of choice.

## Features

- **Multi-Framework Support**: First-class adapters for React, Vue, and Angular.
- **SSR-Safe**: Works seamlessly with Next.js and other server-rendering setups.
- **Embedded Audio**: Includes 5 built-in sounds (embedded via base64) for zero-latency playback.
- **Intelligent Throttle**: Prevents audio spam and escalates to "critical" sounds during rapid-fire errors.
- **Purely Development**: Automatically disables in production environments.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
