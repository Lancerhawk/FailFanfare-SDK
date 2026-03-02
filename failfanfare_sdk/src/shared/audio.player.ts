import { exec } from "child_process";
import * as path from "path";
import * as os from "os";

export function playNodeSound(soundPathOrName: string): void {
  try {
    const soundPath = path.isAbsolute(soundPathOrName)
      ? soundPathOrName
      : path.join(__dirname, "../sounds", soundPathOrName);

    const platform = os.platform();
    let cmd: string;

    if (platform === "darwin") {
      cmd = `afplay "${soundPath}"`;
    } else if (platform === "win32") {
      // MediaPlayer supports MP3; SoundPlayer is WAV only.
      cmd = `powershell -c "Add-Type -AssemblyName PresentationCore; $p = New-Object System.Windows.Media.MediaPlayer; $p.Open('${soundPath}'); $p.Play(); Start-Sleep -s 4"`;
    } else {
      cmd = `aplay "${soundPath}" 2>/dev/null || paplay "${soundPath}" 2>/dev/null`;
    }

    exec(cmd)?.unref();
  } catch {}
}
