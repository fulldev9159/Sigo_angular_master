import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProfileFacade } from '@storeOT/features/profile/profile.facade';
import * as Data from '@data';

@Component({
  selector: 'app-form-pro',
  templateUrl: './form-pro.component.html',
  styleUrls: ['./form-pro.component.scss'],
})
export class FormPro2Component implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  public permissions$: Observable<any>;

  formControls = {
    id: new FormControl(null),
    nombre: new FormControl(null, [Validators.required, this.noWhitespace]),
    descripcion: new FormControl(null, [Validators.required]),
    permisos_OT: new FormControl(null),
    permisos_CUBICACION: new FormControl(null),
    permisos_PERFIL: new FormControl(null),
  };

  formPerfil: FormGroup = new FormGroup(this.formControls);

  constructor(private profileFacade: ProfileFacade, private router: Router) {}

  ngOnInit(): void {
    this.profileFacade.resetData();
    this.initObservables();
    this.initData();
  }

  initObservables() {
    this.permissions$ = this.profileFacade.getPermissions$().pipe(
      map((permissions: Data.Permiso[]) => {
        const data = permissions.map((permit: Data.Permiso) => {
          let permitCustom;
          if (permit && permit.slug) {
            permitCustom = { ...permit, module: permit.slug.split('_')[0] };
          }
          return permitCustom;
        });

        return _.chain(data)
          .groupBy('module')
          .map((value, key) => ({ module: key, permissions: value }))
          .value();
      })
    );
  }

  ngOnDestroy(): void {}

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
    this.profileFacade.getPermissions();
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
        superior: 1,
        permisos,
      };

      console.log(request);
      this.profileFacade.createPerfil(request);
    }
  }
}
