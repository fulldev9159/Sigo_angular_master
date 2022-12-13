import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
//// import { map, withLatestFrom } from 'rxjs/operators';
//// import * as _ from 'lodash';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProyectosFacade } from '@storeOT/proyectos/proyectos.facades';
import {
  ////   Perfil,
  ////   PermisoRol,
  ////   PermisosPerfil,
  ////   PermissionsGroup,
  RequestCreateProyecto,
  ////   RequestUpdatePerfil,
  ////   Rol,
} from '@model';
import { FormProService } from './form-pro.service';
import { LogService } from '@log';

@Component({
  selector: 'zwc-form-proyectos-container',
  templateUrl: './form-proyectos-container.component.html',
  styleUrls: ['./form-proyectos-container.component.scss'],
})
export class FormProyectosContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  //// // DATOS A USAR
  //// allRoles$: Observable<Rol[]>;
  //// permisosRol: PermissionsGroup[] = [];
  //// permisosPerfil: PermisosPerfil[];
  //// // DISPLAY MODALS

  // FORMULARIO
  formControls?: any;
  formProyecto?: FormGroup;
  maxDecimals = 2;

  //// // TABLE

  //// // EXTRAS
  proyecto_id: number | null = null;
  editMode = false;

  //// permissions$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private proyectoFacade: ProyectosFacade,
    private router: Router,
    private detector: ChangeDetectorRef,
    private formProService: FormProService,
    private logger: LogService
  ) {}

  ngOnInit(): void {
    this.proyectoFacade.resetData();

    this.onInitGetInitialData();
    this.onInitSetInitialData();
  }

  onInitGetInitialData(): void {
    this.formControls = this.formProService.FormConfig();
    this.formProyecto = new FormGroup(this.formControls);

    //// this.subscription.add(
    ////   this.route.paramMap?.subscribe(params => {
    ////     const proyecto_id = params.get('id');
    ////     if (proyecto_id !== null) {
    ////       this.editMode = true;
    ////       this.formProyecto.get('id').setValue(proyecto_id);
    ////       this.proyecto_id = +proyecto_id;
    ////       this.proyectoFacade.getProfile();
    ////     }
    ////   })
    //// );
  }

  onInitSetInitialData(): void {
    //// this.subscription.add(
    ////   this.proyectoFacade.getProfile$().subscribe(perfiles => {
    ////     if (perfiles && perfiles.length > 0 && this.proyecto_id) {
    ////       const perfil = perfiles.find(perf => perf.id === +this.proyecto_id);
    ////       this.formPerfil.get('nombre').setValue(perfil.nombre);
    ////       this.formPerfil.get('descripcion').setValue(perfil.descripcion);
    ////       this.formControls.rol.setValue(perfil.rol_id);

    ////       const PermissionsModules = this.getPermissionsGroup2(
    ////         this.permisosPerfil
    ////       );
    ////       // this.logger.debug('PERMISOS', PermissionsModules);
    ////       if (PermissionsModules.find(module => module.module === 'OT')) {
    ////         this.formPerfil
    ////           .get('permisos_OT')
    ////           .setValue(
    ////             PermissionsModules.find(
    ////               module => module.module === 'OT'
    ////             ).permissions.map(permiso => permiso.permiso_id)
    ////           );

    ////         this.detector.detectChanges();
    ////       }
    ////       if (
    ////         PermissionsModules.find(module => module.module === 'CUBICACION')
    ////       ) {
    ////         this.formPerfil
    ////           .get('permisos_CUBICACION')
    ////           .setValue(
    ////             PermissionsModules.find(
    ////               module => module.module === 'CUBICACION'
    ////             ).permissions.map(permiso => permiso.permiso_id)
    ////           );
    ////         this.detector.detectChanges();
    ////       }
    ////       if (PermissionsModules.find(module => module.module === 'PERFIL')) {
    ////         this.formPerfil
    ////           .get('permisos_PERFIL')
    ////           .setValue(
    ////             PermissionsModules.find(
    ////               module => module.module === 'PERFIL'
    ////             ).permissions.map(permiso => permiso.permiso_id)
    ////           );
    ////         this.detector.detectChanges();
    ////       }
    ////     }
    ////   })
    //// );

    setTimeout(() => {
      this.detector.detectChanges();
    }, 1000);
  }

  //// initRolFromControlEvent(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.proyectoFacade.resetData();
    //// this.proyectoFacade.modalPermisosPerfil(false);
    if (this.formProyecto) {
      this.formProyecto.reset();
    }
    this.router.navigate(['/administracion/proyectos/list-proyectos']);
  }

  //// getPermissionsGroup(permissions: PermisoRol[]): PermissionsGroup[] {
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

  //// getPermissionsGroup2(permissions: PermisosPerfil[]): PermissionsGroup[] {
  ////   const data = permissions.map(permit => {
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

  get valid(): boolean {
    return this.formProyecto?.valid ?? false;
  }

  get createRequest(): RequestCreateProyecto | undefined {
    if (this.formProyecto) {
      const { nombre, descripcion, costo_estimado } =
        this.formProyecto.getRawValue();
      return {
        nombre,
        descripcion,
        costo_estimado: +costo_estimado,
      };
    }

    return undefined;
  }

  saveProyecto(): void {
    if (this.valid) {
      if (this.proyecto_id === null) {
        const createRequest = this.createRequest;
        this.proyectoFacade.createProyecto(createRequest);
      } else {
        //// const request: RequestUpdatePerfil = {
        ////   id: this.proyecto_id,
        ////   values: {
        ////     nombre: this.formPerfil.get('nombre').value,
        ////     descripcion: this.formPerfil.get('descripcion').value,
        ////     permisos,
        ////     rol_id: +this.formPerfil.get('rol').value,
        ////     eliminable: true,
        ////   },
        //// };
        //// this.logger.debug('EDIT', request);
        //// this.proyectoFacade.updatePerfil(request);
      }
    }
    ////   const permisosOT =
    ////     this.formPerfil.get('permisos_OT').value === null
    ////       ? []
    ////       : this.formPerfil.get('permisos_OT').value;
    ////   const permisosCubicacion =
    ////     this.formPerfil.get('permisos_CUBICACION').value === null
    ////       ? []
    ////       : this.formPerfil.get('permisos_CUBICACION').value;
    ////   const permisosPerfil =
    ////     this.formPerfil.get('permisos_PERFIL').value === null
    ////       ? []
    ////       : this.formPerfil.get('permisos_PERFIL').value;
    ////   const permisos: number[] = [
    ////     ...permisosOT,
    ////     ...permisosCubicacion,
    ////     ...permisosPerfil,
    ////   ];
    ////   if (this.proyecto_id === null) {
    ////     const request: RequestCreatePerfil = {
    ////       nombre: this.formPerfil.get('nombre').value,
    ////       descripcion: this.formPerfil.get('descripcion').value,
    ////       permisos,
    ////       rol_id: +this.formPerfil.get('rol').value,
    ////       eliminable: true,
    ////     };
    ////     this.logger.debug('CREATE', request);
    ////     this.proyectoFacade.createPerfil(request);
    ////   } else {
    ////     const request: RequestUpdatePerfil = {
    ////       id: this.proyecto_id,
    ////       values: {
    ////         nombre: this.formPerfil.get('nombre').value,
    ////         descripcion: this.formPerfil.get('descripcion').value,
    ////         permisos,
    ////         rol_id: +this.formPerfil.get('rol').value,
    ////         eliminable: true,
    ////       },
    ////     };
    ////     this.logger.debug('EDIT', request);
    ////     this.proyectoFacade.updatePerfil(request);
    ////   }
    ////   this.proyectoFacade.modalPermisosPerfil(false);
  }
}
