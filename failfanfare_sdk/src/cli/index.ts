import * as fs from "fs";
import * as path from "path";
import { startWatcher, CliSounds } from "./watcher";

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  console.log(`
╔══════════════════════════════════╗
╔══════════════════════════════════╗
║        FailFanfare CLI           ║
╚══════════════════════════════════╝

Usage:
  failfanfare [options] <command> [args...]

Options:
  --success <path>   URI or path for build success
  --error <path>     URI or path for compilation errors
  --critical <path>  URI or path for process crashes
  --help, -h         Show this technical manifest

Discovery:
  Automatically resolves configuration from "failfanfare" field 
  in package.json (supports nested "sounds" object) or 
  "failfanfare.config.json" in the current directory.

Examples:
  failfanfare npm run dev
  failfanfare --success ./win.mp3 --error ./fail.mp3 vite
  failfanfare npx jest
`);
  process.exit(0);
}

// 1. Load defaults from files
let customSounds: CliSounds = {};

try {
  const pkgPath = path.resolve(process.cwd(), "package.json");
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    if (pkg.failfanfare) {
      if (pkg.failfanfare.sounds) {
        customSounds = { ...pkg.failfanfare.sounds };
      } else {
        customSounds = { ...pkg.failfanfare };
      }
    }
  }

  const configPath = path.resolve(process.cwd(), "failfanfare.config.json");
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    if (config.sounds) {
      customSounds = { ...customSounds, ...config.sounds };
    } else {
      customSounds = { ...customSounds, ...config };
    }
  }
} catch {
  // Silent fail on config read
}

// 2. Override with CLI flags
const filteredArgs: string[] = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--success" && args[i + 1]) {
    customSounds.success = args[++i];
  } else if (args[i] === "--error" && args[i + 1]) {
    customSounds.error = args[++i];
  } else if (args[i] === "--critical" && args[i + 1]) {
    customSounds.critical = args[++i];
  } else {
    filteredArgs.push(args[i]);
  }
}

const cmd = filteredArgs[0];
const cmdArgs = filteredArgs.slice(1);

if (!cmd) {
  process.exit(1);
}

startWatcher(cmd, cmdArgs, customSounds);
