import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as process from 'process';

export interface BashExecutionProps {
  readonly script: string;
  readonly workingDirectory?: string;
  readonly environment?: {
    [key: string]: string;
  };
}

/**
 * Simple helper class for executing shell scripts and commands
 */
export class ShellHelper {

  static version(command: string, args: string[]): string | undefined {
    const res = spawnSync(command, args);
    if (res.status !== 0) {
      return undefined;
    }
    const match = String(res.stdout).match(/[\d\\.]+/);
    return match ? match.toString() : undefined;
  }

  static bashVersion(): string | undefined {
    return ShellHelper.version('bash', ['--version']);
  }

  static pythonVersion(): string | undefined {
    return ShellHelper.version('python', ['-V']);
  }

  static nodeVersion(): string | undefined {
    return ShellHelper.version('node', ['--version']);
  }

  static goVersion(): string | undefined {
    return ShellHelper.version('go', ['version']);
  }

  static dotnetVersion(): string | undefined {
    return ShellHelper.version('dotnet', ['--version']);
  }

  static checkDirectoryAccess(dir?: string) {
    if (dir !== undefined) {
      fs.accessSync(dir);
      if (!fs.lstatSync(dir).isDirectory()) {
        throw new Error(`${dir} is not a directory`);
      }
    }
  }

  static executeBash(props: BashExecutionProps): boolean {
    ShellHelper.checkDirectoryAccess(props.workingDirectory);
    const res = spawnSync('bash', {
      input: props.script,
      cwd: props.workingDirectory,
      stdio: ['pipe', process.stdout, process.stderr],
      env: {
        ...process.env,
        ...props.environment,
      },
    });
    if (res.error) {
      throw res.error;
    }
    return res.status === 0;
  }

  static executeBashScript(props: BashExecutionProps): boolean {
    ShellHelper.checkDirectoryAccess(props.workingDirectory);
    const res = spawnSync('bash', [props.script], {
      cwd: props.workingDirectory,
      stdio: 'inherit',
      env: {
        ...process.env,
        ...props.environment,
      },
    });
    if (res.error) {
      throw res.error;
    }
    return res.status === 0;
  }
}