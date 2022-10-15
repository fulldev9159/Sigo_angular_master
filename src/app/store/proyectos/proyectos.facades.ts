import { Injectable } from '@angular/core';
import { Proyectos } from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as proyectosSelectors from './proyectos.selectors';
import * as proyectosActions from './proyectos.actions';

@Injectable({
  providedIn: 'root',
})
export class ProyectosFacade {
  constructor(private store: Store<any>) {}

  // GET TODOS LOS PROYECTOS
  public getProyectos(): void {
    this.store.dispatch(proyectosActions.getProyectos());
  }

  public getProyectos$(): Observable<Proyectos[]> {
    return this.store.select(proyectosSelectors.getProyectos);
  }
}
