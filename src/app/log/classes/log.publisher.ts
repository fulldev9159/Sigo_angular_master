import { Observable, of } from 'rxjs';
import { LogEntry } from './log.entry';

export abstract class LogPublisher {
  location: string;
  abstract log(entry: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}
