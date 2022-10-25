import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { PerfilFacade } from '@storeOT/perfil/perfil.facades';
import {
  Perfil,
  PermisoRol,
  PermisosPerfil,
  PermissionsGroup,
  RequestCreatePerfil,
  RequestUpdatePerfil,
  Rol,
} from '@model';
import { FormProService } from './form-pro.service';
import { LogService } from '@log';

@Component({
  selector: 'zwc-form-perfiles-container',
  templateUrl: './form-perfiles-container.component.html',
  styleUrls: ['./form-perfiles-container.component.scss'],
})
export class FormPerfilesContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  // DATOS A USAR
  // perfilSelected$: Observable<Perfil>;
  allRoles$: Observable<Rol[]>;
  // permisosRol$: Observable<PermissionsGroup[]>;
  permisosRol: PermissionsGroup[] = [];
  // permisosPerfil$: Observable<PermisosPerfil[]> = of([]);
  permisosPerfil: PermisosPerfil[];
  // DISPLAY MODALS

  // FORMULARIO
  formControls: any;
  formPerfil: FormGroup;

  // TABLE

  // EXTRAS
  perfil_id: number | null = null;

  permissions$: Observable<any>;

  // rols$: Observable<Data.Rols[]>;

  constructor(
    private route: ActivatedRoute,
    private profileFacade: PerfilFacade,
    private router: Router,
    private detector: ChangeDetectorRef,
    private formProService: FormProService,
    private logger: LogService
  ) {}

  ngOnInit(): void {
    this.onInitResetInicial();
    this.onInitGetInitialData();
    this.onInitSetInitialData();
    this.onInitAccionesInicialesAdicionales();

    // this.initObservables();
    // this.initFormControlsEvents();
    // this.initData();
  }

  onInitResetInicial(): void {
    this.profileFacade.resetData();
  }

  onInitGetInitialData(): void {
    this.formControls = this.formProService.FormConfig();
    this.formPerfil = new FormGroup(this.formControls);
    this.subscription.add(
      this.route.paramMap?.subscribe(params => {
        const perfil_id = params.get('id');
        if (perfil_id !== null) {
          this.formPerfil.get('id').setValue(perfil_id);
          this.perfil_id = +perfil_id;
          this.profileFacade.getProfile();
          this.profileFacade.getPermisosPerfil(+perfil_id);
        }
      })
    );
    this.profileFacade.getAllRoles4createEditPerfil();
  }

  onInitSetInitialData(): void {
    this.allRoles$ = this.profileFacade.getAllRoles4createEditPerfil$();

    // this.PermisosPerfil$ = this.profileFacade.getPermisosPerfil$();
    // this.permisosRol$ = this.profileFacade.getPermisosRol4CreateEdit$().pipe(
    //   map(perfiles => {
    //     console.log('asdasd');
    //     return this.getPermissionsGroup(perfiles);
    //   })
    // );

    this.subscription.add(
      this.profileFacade.getPermisosRol4CreateEdit$().subscribe(perfiles => {
        this.permisosRol = this.getPermissionsGroup(perfiles);
        this.detector.detectChanges();
      })
    );

    this.subscription.add(
      this.profileFacade.getPermisosPerfil$().subscribe(permperfiles => {
        this.logger.debug('SUB', permperfiles);
        this.permisosPerfil = permperfiles;
        this.profileFacade.getProfile();
      })
    );

    this.subscription.add(
      this.profileFacade
        .getProfile$()
        // .pipe(withLatestFrom(this.PermisosPerfil$))
        // .subscribe(([perfiles, permisos]) => {
        .subscribe(perfiles => {
          if (perfiles && perfiles.length > 0 && this.perfil_id) {
            const perfil = perfiles.find(perf => perf.id === +this.perfil_id);
            this.formPerfil.get('nombre').setValue(perfil.nombre);
            this.formPerfil.get('descripcion').setValue(perfil.descripcion);
            this.formControls.rol.setValue(perfil.rol_id);
            // console.log(this.permisosPerfil);

            const PermissionsModules = this.getPermissionsGroup2(
              this.permisosPerfil
            );
            this.logger.debug('PERMISOS', PermissionsModules);
            if (PermissionsModules.find(module => module.module === 'OT')) {
              this.formPerfil
                .get('permisos_OT')
                .setValue(
                  PermissionsModules.find(
                    module => module.module === 'OT'
                  ).permissions.map(permiso => permiso.permiso_id)
                );

              this.detector.detectChanges();
            }
            if (
              PermissionsModules.find(module => module.module === 'CUBICACION')
            ) {
              this.formPerfil
                .get('permisos_CUBICACION')
                .setValue(
                  PermissionsModules.find(
                    module => module.module === 'CUBICACION'
                  ).permissions.map(permiso => permiso.permiso_id)
                );
              this.detector.detectChanges();
            }
            if (PermissionsModules.find(module => module.module === 'PERFIL')) {
              this.formPerfil
                .get('permisos_PERFIL')
                .setValue(
                  PermissionsModules.find(
                    module => module.module === 'PERFIL'
                  ).permissions.map(permiso => permiso.permiso_id)
                );
              this.detector.detectChanges();
            }
          }
        })
    );
    setTimeout(() => {
      this.detector.detectChanges();
    }, 1000);
  }

  onInitAccionesInicialesAdicionales(): void {
    this.subscription.add(
      this.formPerfil.get('rol').valueChanges.subscribe(rol_id => {
        this.formPerfil.get('permisos_OT').reset();
        this.formPerfil.get('permisos_CUBICACION').reset();
        this.formPerfil.get('permisos_PERFIL').reset();

        if (rol_id !== null && rol_id !== undefined) {
          this.profileFacade.getPermisosRol4CreateEdit(+rol_id);
        }
      })
    );
  }

  initObservables(): void {
    // this.permissions$ = this.profileFacade
    //   .getPermissions$()
    //   .pipe(
    //     map((permissions: Data.Permiso[]) =>
    //       this.getPermissionsGroup(permissions)
    //     )
    //   );
    // this.RolPermissions$ = this.profileFacade
    //   .getRolPermissions$()
    //   .pipe(
    //     map((permissions: Data.Permiso[]) =>
    //       this.getPermissionsGroup(permissions)
    //     )
    //   );
  }

  initRolFromControlEvent(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.profileFacade.resetData();
    this.profileFacade.modalPermisosPerfil(false);
    this.router.navigate(['/administracion/perfiles/list-perfiles']);
  }

  initData(): void {
    // this.profileFacade.getRols();
    // this.profileFacade.getPermissions();
    // this.rols$ = this.profileFacade.getRols$();
    // this.subscription.add(
    //   this.profileFacade.getProfileSelected$().subscribe(perfil => {
    //     if (perfil) {
    //       this.formPerfil.get('nombre').setValue(perfil.nombre);
    //       this.formPerfil.get('descripcion').setValue(perfil.descripcion);
    //       this.formControls.rol.setValue(perfil.rol_id);
    //       // const PermissionsModules = this.getPermissionsGroup(perfil.permisos);
    //       // if (PermissionsModules.find(module => module.module === 'OT')) {
    //       //   this.formPerfil
    //       //     .get('permisos_OT')
    //       //     .setValue(
    //       //       PermissionsModules.find(
    //       //         module => module.module === 'OT'
    //       //       ).permissions.map(permiso => permiso.id)
    //       //     );
    //       // }
    //       // if (
    //       //   PermissionsModules.find(module => module.module === 'CUBICACION')
    //       // ) {
    //       //   this.formPerfil
    //       //     .get('permisos_CUBICACION')
    //       //     .setValue(
    //       //       PermissionsModules.find(
    //       //         module => module.module === 'CUBICACION'
    //       //       ).permissions.map(permiso => permiso.id)
    //       //     );
    //       // }
    //       // if (PermissionsModules.find(module => module.module === 'PERFIL')) {
    //       //   this.formPerfil
    //       //     .get('permisos_PERFIL')
    //       //     .setValue(
    //       //       PermissionsModules.find(
    //       //         module => module.module === 'PERFIL'
    //       //       ).permissions.map(permiso => permiso.id)
    //       //     );
    //       // }
    //     }
    //   })
    // );
  }

  // getPermissionsGroup(permissions: Data.Permiso[]): Data.PermissionsGroup[] {
  //   const data = permissions.map((permit: Data.Permiso) => {
  //     let permitCustom: any;
  //     if (permit && permit.slug) {
  //       permitCustom = { ...permit, module: permit.slug.split('_')[0] };
  //     }
  //     return permitCustom;
  //   });
  //   return _.chain(data)
  //     .groupBy('module')
  //     .map((value, key) => ({ module: key, permissions: value }))
  //     .value();
  // }

  getPermissionsGroup(permissions: PermisoRol[]): PermissionsGroup[] {
    const data = permissions?.map(permit => {
      let permitCustom: any;
      if (permit && permit.model_permiso_id.slug) {
        permitCustom = {
          ...permit,
          module: permit.model_permiso_id.slug.split('_')[0],
        };
      }
      return permitCustom;
    });
    // console.log(
    //   _.chain(data)
    //     .groupBy('module')
    //     .map((value, key) => ({ module: key, permissions: value }))
    //     .value()
    // );
    return _.chain(data)
      .groupBy('module')
      .map((value, key) => ({ module: key, permissions: value }))
      .value();
  }

  getPermissionsGroup2(permissions: PermisosPerfil[]): PermissionsGroup[] {
    const data = permissions.map(permit => {
      let permitCustom: any;
      if (permit && permit.model_permiso_id.slug) {
        permitCustom = {
          ...permit,
          module: permit.model_permiso_id.slug.split('_')[0],
        };
      }
      return permitCustom;
    });
    // console.log(
    //   _.chain(data)
    //     .groupBy('module')
    //     .map((value, key) => ({ module: key, permissions: value }))
    //     .value()
    // );
    return _.chain(data)
      .groupBy('module')
      .map((value, key) => ({ module: key, permissions: value }))
      .value();
  }

  saveProfile(): void {
    const permisosOT =
      this.formPerfil.get('permisos_OT').value === null
        ? []
        : this.formPerfil.get('permisos_OT').value;
    const permisosCubicacion =
      this.formPerfil.get('permisos_CUBICACION').value === null
        ? []
        : this.formPerfil.get('permisos_CUBICACION').value;
    const permisosPerfil =
      this.formPerfil.get('permisos_PERFIL').value === null
        ? []
        : this.formPerfil.get('permisos_PERFIL').value;
    const permisos: number[] = [
      ...permisosOT,
      ...permisosCubicacion,
      ...permisosPerfil,
    ];

    if (this.perfil_id === null) {
      const request: RequestCreatePerfil = {
        nombre: this.formPerfil.get('nombre').value,
        descripcion: this.formPerfil.get('descripcion').value,
        permisos,
        rol_id: +this.formPerfil.get('rol').value,
        eliminable: true,
      };

      this.logger.debug('CREATE', request);
      this.profileFacade.createPerfil(request);
    } else {
      const request: RequestUpdatePerfil = {
        id: this.perfil_id,
        values: {
          nombre: this.formPerfil.get('nombre').value,
          descripcion: this.formPerfil.get('descripcion').value,
          permisos,
          rol_id: +this.formPerfil.get('rol').value,
          eliminable: true,
        },
      };
      this.logger.debug('EDIT', request);
      this.profileFacade.updatePerfil(request);
    }

    this.profileFacade.modalPermisosPerfil(false);
  }
}
