import { Injectable } from '@angular/core';
import { Proyecto, RequestCreateProyecto } from '@model';
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

  public getProyectos$(): Observable<Proyecto[]> {
    return this.store.select(proyectosSelectors.getProyectos);
  }

  // RESET DATA
  public resetData(): void {
    this.store.dispatch(proyectosActions.resetData());
  }

  // CREATE PROYECTO
  public createProyecto(request: RequestCreateProyecto): void {
    this.store.dispatch(proyectosActions.createProyecto({ request }));
  }

  // UPDATE PROYECTO
  public updateProyecto(
    proyecto_id: number,
    request: RequestCreateProyecto
  ): void {
    this.store.dispatch(
      proyectosActions.updateProyecto({ proyecto_id, request })
    );
  }

  // ELIMINAR PROYECTO
  public deleteProyecto(proyecto_id: number): void {
    this.store.dispatch(proyectosActions.deleteProyecto({ proyecto_id }));
  }
}
