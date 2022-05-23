import {spawnSync} from "child_process";
import * as process from "process";

/**
 * Simple helper class for executing shell scripts and commands
 */
export class ShellHelper {

  static version(command: string, args: string[]): string | null {
    const res = spawnSync(command, args);
    if (res.status !== 0) {
      return null;
    }
    const match = String(res.stdout).match(/[\d\\.]+/);
    return match ? match.toString() : null;
  }

  static bashVersion(): string | null {
    return ShellHelper.version('bash', ['--version'])
  }

  static pythonVersion(): string | null {
    return ShellHelper.version('python', ['-V']);
  }

  static nodeVersion(): string | null {
    return ShellHelper.version('node', ['--version']);
  }

  static goVersion(): string | null {
    return ShellHelper.version('go', ['version']);
  }

  static dotnetVersion(): string | null {
    return ShellHelper.version('dotnet', ['--version']);
  }

  static executeBash(script: string): boolean {
    const res = spawnSync('bash', {
      input: script,
      stdio: ['pipe', process.stdout, process.stderr]
    });
    return res.status === 0;
  }

  static executeBashScript(scriptLocation: string): boolean {
    const res = spawnSync('bash', [scriptLocation], {
      stdio: 'inherit'
    });
    return res.status === 0;
  }
}
