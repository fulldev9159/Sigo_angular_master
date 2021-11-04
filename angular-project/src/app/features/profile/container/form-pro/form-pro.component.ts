import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProfileFacade } from '@storeOT/features/profile/profile.facade';
import * as Data from '@data';

@Component({
  selector: 'app-form-pro',
  templateUrl: './form-pro.component.html',
  styleUrls: ['./form-pro.component.scss'],
})
export class FormProComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  permissions$: Observable<any>;
  RolPermissions$: Observable<any>;

  perfilSelected$: Observable<Data.Perfil>;
  rols$: Observable<Data.Rols[]>;

  formControls = {
    id: new FormControl(null),
    nombre: new FormControl(null, [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(100),
    ]),
    descripcion: new FormControl(null, [
      Validators.required,
      Validators.maxLength(200),
    ]),
    rol: new FormControl(null, [Validators.required]),
    permisos_OT: new FormControl(null),
    permisos_CUBICACION: new FormControl(null),
    permisos_PERFIL: new FormControl(null),
  };

  formPerfil: FormGroup = new FormGroup(this.formControls);

  constructor(
    private route: ActivatedRoute,
    private profileFacade: ProfileFacade,
    private router: Router,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.profileFacade.resetData();
    this.initObservables();
    this.initFormControlsEvents();
    this.initData();

    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id !== null) {
          const perfil_id = +params.get('id');
          this.formPerfil.get('id').setValue(perfil_id);
          this.profileFacade.getProfileSelected(perfil_id);
        }
      })
    );
  }

  initFormControlsEvents(): void {
    this.initRolFromControlEvent();
  }

  initObservables(): void {
    this.permissions$ = this.profileFacade
      .getPermissions$()
      .pipe(
        map((permissions: Data.Permiso[]) =>
          this.getPermissionsGroup(permissions)
        )
      );

    this.RolPermissions$ = this.profileFacade
      .getRolPermissions$()
      .pipe(
        map((permissions: Data.Permiso[]) =>
          this.getPermissionsGroup(permissions)
        )
      );
  }

  initRolFromControlEvent(): void {
    this.subscription.add(
      this.formPerfil.get('rol').valueChanges.subscribe(rol_id => {
        this.formPerfil.get('permisos_OT').reset();
        this.formPerfil.get('permisos_CUBICACION').reset();
        this.formPerfil.get('permisos_PERFIL').reset();

        if (rol_id !== null && rol_id !== undefined) {
          this.profileFacade.getRolPermissions(+rol_id);
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.profileFacade.resetData();
    this.router.navigate(['/app/profile/list-pro']);
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  initData(): void {
    this.profileFacade.getRols();
    this.profileFacade.getPermissions();
    this.rols$ = this.profileFacade.getRols$();
    this.subscription.add(
      this.profileFacade.getProfileSelected$().subscribe(perfil => {
        if (perfil) {
          this.formPerfil.get('nombre').setValue(perfil.nombre);
          this.formPerfil.get('descripcion').setValue(perfil.descripcion);
          this.formControls.rol.setValue(perfil.rol_id);
          const PermissionsModules = this.getPermissionsGroup(perfil.permisos);
          if (PermissionsModules.find(module => module.module === 'OT')) {
            this.formPerfil
              .get('permisos_OT')
              .setValue(
                PermissionsModules.find(
                  module => module.module === 'OT'
                ).permissions.map(permiso => permiso.id)
              );
          }

          if (
            PermissionsModules.find(module => module.module === 'CUBICACION')
          ) {
            this.formPerfil
              .get('permisos_CUBICACION')
              .setValue(
                PermissionsModules.find(
                  module => module.module === 'CUBICACION'
                ).permissions.map(permiso => permiso.id)
              );
          }

          if (PermissionsModules.find(module => module.module === 'PERFIL')) {
            this.formPerfil
              .get('permisos_PERFIL')
              .setValue(
                PermissionsModules.find(
                  module => module.module === 'PERFIL'
                ).permissions.map(permiso => permiso.id)
              );
          }
        }
      })
    );

    setTimeout(() => {
      this.detector.detectChanges();
    }, 1000);
  }

  getPermissionsGroup(permissions: Data.Permiso[]): Data.PermissionsGroup[] {
    const data = permissions.map((permit: Data.Permiso) => {
      let permitCustom: any;
      if (permit && permit.slug) {
        permitCustom = { ...permit, module: permit.slug.split('_')[0] };
      }
      return permitCustom;
    });
    return _.chain(data)
      .groupBy('module')
      .map((value, key) => ({ module: key, permissions: value }))
      .value();
  }

  saveProfile(): void {
    const perfil_id = this.formPerfil.get('id').value;
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

    if (perfil_id === null) {
      const request: Data.CreatePerfilRequest = {
        nombre: this.formPerfil.get('nombre').value,
        descripcion: this.formPerfil.get('descripcion').value,
        permisos,
        rol_id: +this.formPerfil.get('rol').value,
      };

      console.log('CREATE', request);
      this.profileFacade.createPerfil(request);
    } else {
      const request: Data.EditPerfilRequest = {
        id: perfil_id,
        nombre: this.formPerfil.get('nombre').value,
        descripcion: this.formPerfil.get('descripcion').value,
        permisos,
        rol_id: +this.formPerfil.get('rol').value,
      };
      console.log('EDIT', request);
      this.profileFacade.editProfile(request);
    }
  }
}
