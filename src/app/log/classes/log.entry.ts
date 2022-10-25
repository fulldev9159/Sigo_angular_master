import { LogLevel } from '../enums/log.level';

export class LogEntry {
  private message = '';
  private level: LogLevel = LogLevel.INFO;
  private params: any[] = [];

  constructor(message: string, level: LogLevel, params: any[]) {
    this.message = message;
    this.level = level;
    this.params = params;
  }

  public buildLogString(): string {
    let log = `time=${new Date()} level=${LogLevel[this.level]} msg=${
      this.message
    }`;

    if (this.params.length > 0) {
      log += ` params=${this.formatParams(this.params)}`;
    }

    return log;
  }

  private formatParams(params: any[]): string {
    return params.map(param => JSON.stringify(param)).join(',');
  }
}
