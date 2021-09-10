import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProfileFacade } from '@storeOT/features/profile/profile.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
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
    nombre: new FormControl(null, [Validators.required]),
    descripcion: new FormControl(null, [Validators.required]),
    permisos: new FormControl(null),
  };

  formPerfil: FormGroup = new FormGroup(this.formControls);

  constructor(
    private profileFacade: ProfileFacade,
    private router: Router,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.profileFacade.resetData();
    this.initObservables();
    this.authFacade.getLogin$().subscribe(authLogin => {
      if (authLogin) {
        this.profileFacade.getPermissions({ token: authLogin.token });
      }
    });
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
}
