import { Injectable } from '@angular/core';
import { LogPublisher } from '../classes/log.publisher';
import { LogConsolePublisher } from '../classes/log.console.publisher';

@Injectable({
  providedIn: 'root',
})
export class LogPublishersService {
  public publishers: LogPublisher[] = [];

  constructor() {
    this.buildPublishers();
  }

  private buildPublishers(): void {
    this.publishers.push(new LogConsolePublisher());
  }
}
