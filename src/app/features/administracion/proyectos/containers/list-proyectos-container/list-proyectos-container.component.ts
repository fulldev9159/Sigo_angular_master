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

  ////// // DISPLAY MODALS
  ////// DisplayPermisosPerfilModal = false;
  ////// displayModalEliminarPerfil = false;

  // EXTRAS
  proyecto_id: number | null = null;

  ////// // ICONS
  ////// permisosIcon = faEye;
  editIcon = faPencil;
  ////// trashICon = faTrash;

  // CONSTRUCTOR
  constructor(
    private proyectoFacade: ProyectosFacade,
    private loadingFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.proyectoFacade.resetData();
    this.proyectoFacade.getProyectos();
  }

  //// closeModalPermisosPerfil(): void {
  ////   this.proyectoFacade.resetPermisosPerfil();
  ////   this.DisplayPermisosPerfilModal = false;
  //// }

  //// closeModalEliminarPerfil(): void {
  ////   this.displayModalEliminarPerfil = false;
  ////   this.proyecto_id = null;
  //// }

  //// EliminarPerfil(): void {
  ////   if (this.proyecto_id) {
  ////     this.proyectoFacade.eliminarPerfil(this.proyecto_id);
  ////     this.closeModalEliminarPerfil();
  ////     setTimeout(() => {
  ////       this.proyectoFacade.getProfile();
  ////     }, 700);
  ////   }
  //// }

  //// verPermisos(perfil: ListarPerfil): void {
  ////   this.DisplayPermisosPerfilModal = true;
  ////   this.proyectoFacade.getPermisosPerfil(perfil.id);
  //// }

  //// eliminar(perfil: ListarPerfil): void {
  ////   this.displayModalEliminarPerfil = true;
  ////   this.proyecto_id = perfil.id;
  //// }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
