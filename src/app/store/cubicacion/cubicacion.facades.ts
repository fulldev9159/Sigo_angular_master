import { Injectable } from '@angular/core';
import { PerfilesUsuario, Response, TipoCubicacion } from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as cubicacionSelectors from './cubicacion.selectors';
import * as cubicacionActions from './cubicacion.actions';

@Injectable({
  providedIn: 'root',
})
export class CubicacionFacade {
  constructor(private store: Store<any>) {}

  // GET TIPOS DE CUBICACIONES
  public getTipoCubicacion(): void {
    this.store.dispatch(cubicacionActions.getTipoCubicacion());
  }

  public getTipoCubicacionSuccess(
    response: Response<{ items: TipoCubicacion[] }>
  ): void {
    this.store.dispatch(
      cubicacionActions.getTipoCubicacionSuccess({ response })
    );
  }

  public getTipoCubicacionError(error: any) {
    this.store.dispatch(cubicacionActions.getTipoCubicacionError({ error }));
  }

  public getTipoCubicacion$(): Observable<TipoCubicacion[]> {
    return this.store.select(cubicacionSelectors.getTipoCubicacion);
  }
}
