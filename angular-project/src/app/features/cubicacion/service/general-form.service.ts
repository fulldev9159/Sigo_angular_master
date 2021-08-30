import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Item {
  controlName: string;
  value: any;
}

@Injectable({
  providedIn: 'root',
})
export class GeneralFormService {
  private valueChangesSubject: BehaviorSubject<Item>;
  public valueChanges: Observable<Item>;

  constructor() {
    this.valueChangesSubject = new BehaviorSubject<Item>(null);
    this.valueChanges = this.valueChangesSubject.asObservable();
  }

  setValueChanges(item: Item): void {
    this.valueChangesSubject.next(item);
  }
}
