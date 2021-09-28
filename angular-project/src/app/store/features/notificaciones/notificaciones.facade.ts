import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as NotificaionesActions from './notificaciones.actions';
import * as NotificacionesSelectors from './notificaciones.selectors';
import * as Data from '@data';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesFacade {
  constructor(private store: Store<Data.Notificaciones>) {}

  public getNotificacioes(): void {
    this.store.dispatch(NotificaionesActions.getNotificaciones());
  }

  public getNotificaciones$(): Observable<Data.Notificaciones> {
    return this.store.select(NotificacionesSelectors.getNotificacioes);
  }

  public markNotification(id: number[]): void {
    this.store.dispatch(NotificaionesActions.markNotification({ id }));
  }
}
