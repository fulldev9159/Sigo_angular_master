import { Injectable, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogLevel } from '../enums/log.level';
import { LogEntry } from '../classes/log.entry';
import { LogPublisher } from '../classes/log.publisher';
import { LogPublishersService } from './log.publishers.service';

@Injectable({
  providedIn: 'root',
})
export class LogService implements OnDestroy {
  private subscription: Subscription = new Subscription();
  private publishers: LogPublisher[] = [];
  private level = LogLevel.INFO;

  constructor(
    @Inject('environment') environment: { log?: { level?: any } },
    private publishersService: LogPublishersService
  ) {
    const label: keyof typeof LogLevel = environment?.log?.level ?? 'OFF';
    this.level = LogLevel[label] ?? LogLevel.OFF;
    this.publishers = publishersService.publishers;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public log(message: string, ...params: any[]): void {
    this.writeToLog(message, LogLevel.INFO, params);
  }

  public trace(message: string, ...params: any[]): void {
    this.writeToLog(message, LogLevel.TRACE, params);
  }

  public debug(message: string, ...params: any[]): void {
    this.writeToLog(message, LogLevel.DEBUG, params);
  }

  public info(message: string, ...params: any[]): void {
    this.writeToLog(message, LogLevel.INFO, params);
  }

  public warn(message: string, ...params: any[]): void {
    this.writeToLog(message, LogLevel.WARN, params);
  }

  public error(message: string, ...params: any[]): void {
    this.writeToLog(message, LogLevel.ERROR, params);
  }

  public fatal(message: string, ...params: any[]): void {
    this.writeToLog(message, LogLevel.FATAL, params);
  }

  public panic(message: string, ...params: any[]): void {
    this.writeToLog(message, LogLevel.PANIC, params);
  }

  private writeToLog(message: string, level: LogLevel, params: any[]): void {
    if (this.shouldLog(level)) {
      const entry: LogEntry = new LogEntry(message, level, params);
      this.publishers.forEach(logger =>
        this.subscription.add(logger.log(entry).subscribe(response => {}))
      );
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return (
      level !== LogLevel.OFF &&
      this.level !== LogLevel.OFF &&
      level >= this.level
    );
  }
}
