import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  thereAreNullUndefEmptyStr(obj: Object): boolean {
    return Object.values(obj).some(value => {
      if (value === null || value === undefined || value === '') {
        return true;
      }
      return false;
    });
  }
}
