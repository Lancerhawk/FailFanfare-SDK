import { exec } from "child_process";
import * as path from "path";
import * as os from "os";

export function playNodeSound(soundName: string): void {
  try {
    const soundPath = path.join(__dirname, "../sounds", soundName);
    const platform = os.platform();

    let cmd: string;

    if (platform === "darwin") {
      cmd = `afplay "${soundPath}"`;
    } else if (platform === "win32") {
      cmd = `powershell -c "(New-Object Media.SoundPlayer '${soundPath}').Play()"`;
    } else {
      cmd = `aplay "${soundPath}" 2>/dev/null || paplay "${soundPath}" 2>/dev/null`;
    }

    exec(cmd)?.unref();
  } catch {}
}
