import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
//// import { map } from 'rxjs/operators';
import { ProyectosFacade } from '@storeOT/proyectos/proyectos.facades';
//// import * as _ from 'lodash';
import { Proyecto } from '@model';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';

@Component({
  selector: 'zwc-list-proyectos-container',
  templateUrl: './list-proyectos-container.component.html',
  styleUrls: ['./list-proyectos-container.component.scss'],
})
export class ListProyectosContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  // DATOS A USAR
  proyectos$: Observable<Proyecto[]> = this.proyectoFacade.getProyectos$();

  // LOADINGS
  loadingGetProyectos$: Observable<boolean> =
    this.loadingFacade.sendingGetProyectos$();

  // DISPLAY MODALS
  //// DisplayPermisosProyectoModal = false;
  displayModalEliminarProyecto = false;

  // EXTRAS
  proyecto_id: number | null = null;

  ////// // ICONS
  ////// permisosIcon = faEye;
  editIcon = faPencil;
  trashICon = faTrash;

  // CONSTRUCTOR
  constructor(
    private proyectoFacade: ProyectosFacade,
    private loadingFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.proyectoFacade.resetData();
    this.proyectoFacade.getProyectos();
  }

  //// closeModalPermisosProyecto(): void {
  ////   this.proyectoFacade.resetPermisosProyecto();
  ////   this.DisplayPermisosProyectoModal = false;
  //// }

  closeModalEliminarProyecto(): void {
    this.displayModalEliminarProyecto = false;
    this.proyecto_id = null;
  }

  EliminarProyecto(): void {
    if (this.proyecto_id) {
      this.proyectoFacade.deleteProyecto(this.proyecto_id);
      this.closeModalEliminarProyecto();
      setTimeout(() => {
        this.proyectoFacade.getProyectos();
      }, 700);
    }
  }

  //// verPermisos(proyecto: Proyecto): void {
  ////   this.DisplayPermisosProyectoModal = true;
  ////   this.proyectoFacade.getPermisosProyecto(proyecto.id);
  //// }

  eliminar(proyecto: Proyecto): void {
    this.displayModalEliminarProyecto = true;
    this.proyecto_id = proyecto.id;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
