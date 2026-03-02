import { startWatcher } from "./watcher";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
╔══════════════════════════════════╗
║        FailFanfare CLI           ║
╚══════════════════════════════════╝

Usage:
  failfanfare <command> [args...]

Examples:
  failfanfare npm run dev
  failfanfare next dev
  failfanfare vite
  failfanfare yarn dev

Wraps your dev server and plays sounds on crashes and successes.
`);
  process.exit(0);
}

const cmd = args[0];
const cmdArgs = args.slice(1);

if (!cmd) {
  process.exit(1);
}

startWatcher(cmd, cmdArgs);
