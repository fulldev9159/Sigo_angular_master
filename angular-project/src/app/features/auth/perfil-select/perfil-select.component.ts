import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilesUser } from '@data';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-perfil-select',
  templateUrl: './perfil-select.component.html',
  styleUrls: ['./perfil-select.component.scss'],
})
export class PerfilSelectComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  perfiles$: Observable<PerfilesUser[]>;
  perfiles: PerfilesUser[];

  formControls = {
    proxyperfil: new FormControl(null, [Validators.required]),
  };

  formPerfil: FormGroup = new FormGroup(this.formControls);
  constructor(private router: Router, private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authFacade.getLogin$().subscribe(loginAuth => {
        if (
          loginAuth?.token === undefined &&
          loginAuth?.proxy_id === undefined
        ) {
          this.router.navigate(['/auth/login']);
        }
      })
    );

    this.authFacade.getPerfilesUser();
    this.perfiles$ = this.authFacade
      .pefilesUsuario$()
      .pipe(map(perfiles => (this.perfiles = perfiles)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshLogin(): void {
    const proxy_id = +this.formPerfil.get('proxyperfil').value;
    const nombre_perfil_select = this.perfiles.filter(
      perfil => perfil.proxy_id === proxy_id
    )[0].model_perfil.nombre;

    this.authFacade.refreshLogin(+proxy_id, nombre_perfil_select);
  }
}
