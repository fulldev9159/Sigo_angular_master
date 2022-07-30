import { Injectable } from '@angular/core';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { map, Observable, of, take } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authFacade: AuthFacade,
    private utilsService: UtilsService
  ) {}

  isLoggin(): boolean {
    const sessionData = JSON.parse(localStorage.getItem('sessionData'));
    return sessionData
      ? !this.utilsService.thereAreNullUndefEmptyStr(sessionData)
      : false;
  }

  isAuth(): boolean {
    const sessionData = JSON.parse(localStorage.getItem('sessionData'));
    if (sessionData) {
      if (sessionData.token !== undefined && sessionData.token !== null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isPerfiled(): boolean {
    const sessionData = JSON.parse(localStorage.getItem('sessionData'));
    if (sessionData) {
      if (sessionData.permisos.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
