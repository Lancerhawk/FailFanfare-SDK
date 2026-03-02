import { spawn } from "child_process";
import * as path from "path";
import { playNodeSound } from "../shared/audio.player";

const SUCCESS_KEYWORDS =
  /ready|compiled successfully|local:|started|listening|successfully/i;
const ERROR_KEYWORDS =
  /error|failed|exception|crash|invalid|syntax|unexpected|unhandled|rejected|not found|warning|failed to/i;

export interface CliSounds {
  success?: string;
  error?: string;
  critical?: string;
  runtime?: string;
  console?: string;
  promise?: string;
}

export function startWatcher(
  cmd: string,
  args: string[],
  customSounds?: CliSounds
): void {
  let successPlayed = false;
  let errorPlayed = false;

  const sounds = {
    success: customSounds?.success || "oh_my_god_wow.mp3",
    error:
      customSounds?.error ||
      customSounds?.runtime ||
      customSounds?.console ||
      customSounds?.promise ||
      "aabe_saale.mp3",
    critical: customSounds?.critical || "spider_man_32.mp3",
  };

  // Helper to resolve custom paths relative to CWD if they are not absolute
  const resolveSound = (s: string) => {
    if (s.endsWith(".mp3") && !s.includes("/") && !s.includes("\\")) return s; // internal
    return path.isAbsolute(s) ? s : path.resolve(process.cwd(), s);
  };

  const successSound = resolveSound(sounds.success);
  const errorSound = resolveSound(sounds.error);
  const criticalSound = resolveSound(sounds.critical);

  console.log(`[failfanfare] 🎧 Listening for terminal success/errors...`);

  const child = spawn(cmd, args, {
    stdio: ["inherit", "pipe", "pipe"],
    shell: true,
    env: { ...process.env, FORCE_COLOR: "1" },
  });

  let stdoutBuffer = "";
  child.stdout?.on("data", (chunk: Buffer) => {
    const text = chunk.toString();
    process.stdout.write(text);
    stdoutBuffer += text;
    if (stdoutBuffer.length > 2000) stdoutBuffer = stdoutBuffer.slice(-2000);

    // 1. Check for success
    if (!successPlayed && SUCCESS_KEYWORDS.test(stdoutBuffer)) {
      successPlayed = true;
      console.log(`[failfanfare] 🎺 Playing Success Sound...`);
      playNodeSound(successSound);
    }

    // 2. Also check stdout for errors
    if (!errorPlayed && ERROR_KEYWORDS.test(stdoutBuffer)) {
      errorPlayed = true;
      console.log(`[failfanfare] 🎺 Playing Error Sound...`);
      playNodeSound(errorSound);
      setTimeout(() => {
        errorPlayed = false;
      }, 3000);
    }
  });

  let stderrBuffer = "";
  child.stderr?.on("data", (chunk: Buffer) => {
    const text = chunk.toString();
    process.stderr.write(text);
    stderrBuffer += text;
    if (stderrBuffer.length > 2000) stderrBuffer = stderrBuffer.slice(-2000);

    if (!errorPlayed && ERROR_KEYWORDS.test(stderrBuffer)) {
      errorPlayed = true;
      console.log(`[failfanfare] 🎺 Playing Error Sound (stderr)...`);
      playNodeSound(errorSound);
      setTimeout(() => {
        errorPlayed = false;
      }, 3000);
    }
  });

  function exitWithSound(code: number, sound: string): void {
    playNodeSound(sound);
    // Wait 2s for sound to start before killing the process
    setTimeout(() => {
      process.exit(code);
    }, 2000);
  }

  process.on("SIGINT", () => {
    child.kill("SIGINT");
  });

  child.on("close", (code: number | null) => {
    const finalCode = code ?? 0;
    if (finalCode !== 0) {
      exitWithSound(finalCode, criticalSound);
    } else {
      process.exit(0);
    }
  });

  child.on("error", (err: NodeJS.ErrnoException) => {
    process.stderr.write(
      `[failfanfare] Failed to start process: ${err.message}\n`
    );
    exitWithSound(1, criticalSound);
  });
}
