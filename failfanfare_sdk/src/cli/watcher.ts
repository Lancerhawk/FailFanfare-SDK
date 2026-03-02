import { spawn } from "child_process";
import { playNodeSound } from "../shared/audio.player";

const SUCCESS_KEYWORDS =
  /ready|compiled successfully|local:|started|listening/i;
const ERROR_KEYWORDS = /error|failed|exception|crash/i;

export function startWatcher(cmd: string, args: string[]): void {
  let successPlayed = false;
  let errorPlayed = false;

  const child = spawn(cmd, args, {
    stdio: ["inherit", "pipe", "pipe"],
    shell: true,
  });

  child.stdout?.on("data", (chunk: Buffer) => {
    const text = chunk.toString();
    process.stdout.write(text);

    if (!successPlayed && SUCCESS_KEYWORDS.test(text)) {
      successPlayed = true;
      playNodeSound("oh_my_god_wow.mp3");
    }
  });

  child.stderr?.on("data", (chunk: Buffer) => {
    const text = chunk.toString();
    process.stderr.write(text);

    if (!errorPlayed && ERROR_KEYWORDS.test(text)) {
      errorPlayed = true;
      playNodeSound("aabe_saale.mp3");

      setTimeout(() => {
        errorPlayed = false;
      }, 3000);
    }
  });

  process.on("SIGINT", () => {
    child.kill("SIGINT");
  });

  child.on("close", (code: number | null) => {
    if (code !== 0 && code !== null) {
      playNodeSound("spider_man_32.mp3");
    }
    process.exit(code ?? 0);
  });

  child.on("error", (err: NodeJS.ErrnoException) => {
    process.stderr.write(
      `[failfanfare] Failed to start process: ${err.message}\n`
    );
    playNodeSound("aabe_saale.mp3");
    process.exit(1);
  });
}
