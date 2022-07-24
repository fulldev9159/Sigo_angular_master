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

  isLoggin(): Observable<boolean> {
    return this.authFacade.getSessionData$().pipe(
      map(sessionData =>
        sessionData
          ? !this.utilsService.thereAreNullUndefEmptyStr(sessionData)
          : false
      ),
      take(1)
    );
  }
}
