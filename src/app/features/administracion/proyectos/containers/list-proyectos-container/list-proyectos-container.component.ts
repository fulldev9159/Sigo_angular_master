import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
//// import { map } from 'rxjs/operators';
import { ProyectosFacade } from '@storeOT/proyectos/proyectos.facades';
//// import * as _ from 'lodash';
import {
  Proyecto,
  ////   Perfil,
  ////   Permiso,
  ////   PermisosPerfil,
  ////   PermissionsGroup,
} from '@model';
//// //// import { ListProTableService } from './list-pro-table.service';
//// import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
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

  ////// PermisosPerfil$: Observable<PermissionsGroup[]> = this.profileFacade
  //////   .getPermisosPerfil$()
  //////   .pipe(map(perfiles => this.getPermissionsGroup(perfiles)));

  // LOADINGS
  loadingGetProyectos$: Observable<boolean> =
    this.loadingFacade.sendingGetProyectos$();

  ////// // DISPLAY MODALS
  ////// DisplayPermisosPerfilModal = false;
  ////// displayModalEliminarPerfil = false;

  ////// // EXTRAS
  ////// perfil_id: number | null = null;

  ////// // ICONS
  ////// permisosIcon = faEye;
  ////// editIcon = faPencil;
  ////// trashICon = faTrash;

  // CONSTRUCTOR
  constructor(
    private proyectoFacade: ProyectosFacade,
    private loadingFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    console.log('init');
    //// this.profileFacade.resetData();
    //// this.profileFacade.getProfile();
  }

  //// closeModalPermisosPerfil(): void {
  ////   this.profileFacade.resetPermisosPerfil();
  ////   this.DisplayPermisosPerfilModal = false;
  //// }

  //// closeModalEliminarPerfil(): void {
  ////   this.displayModalEliminarPerfil = false;
  ////   this.perfil_id = null;
  //// }

  //// EliminarPerfil(): void {
  ////   if (this.perfil_id) {
  ////     this.profileFacade.eliminarPerfil(this.perfil_id);
  ////     this.closeModalEliminarPerfil();
  ////     setTimeout(() => {
  ////       this.profileFacade.getProfile();
  ////     }, 700);
  ////   }
  //// }

  //// getPermissionsGroup(permissions: PermisosPerfil[]): PermissionsGroup[] {
  ////   const data = permissions?.map(permit => {
  ////     let permitCustom: any;
  ////     if (permit && permit.model_permiso_id.slug) {
  ////       permitCustom = {
  ////         ...permit,
  ////         module: permit.model_permiso_id.slug.split('_')[0],
  ////       };
  ////     }
  ////     return permitCustom;
  ////   });
  ////   return _.chain(data)
  ////     .groupBy('module')
  ////     .map((value, key) => ({ module: key, permissions: value }))
  ////     .value();
  //// }

  //// verPermisos(perfil: ListarPerfil): void {
  ////   this.DisplayPermisosPerfilModal = true;
  ////   this.profileFacade.getPermisosPerfil(perfil.id);
  //// }

  //// eliminar(perfil: ListarPerfil): void {
  ////   this.displayModalEliminarPerfil = true;
  ////   this.perfil_id = perfil.id;
  //// }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
