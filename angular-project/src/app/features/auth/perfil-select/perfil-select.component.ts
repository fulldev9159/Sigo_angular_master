import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilesUser } from '@data';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';
import { UserFacade } from '@storeOT/features/user/user.facade';
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
  usuario_id = null;
  perfilesUsuario$: Observable<PerfilesUser[]>;
  perfilesUsuario: PerfilesUser[];

  formControls = {
    proxyperfil: new FormControl(null, [Validators.required]),
  };

  formPerfil: FormGroup = new FormGroup(this.formControls);
  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private cubicacionFacade: CubicacionFacade,
    private otFacade: OtFacade,
    private profileFacade: ProfileFacade,
    private userFacade: UserFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authFacade.getLogin$().subscribe(loginAuth => {
        if (
          loginAuth?.token === undefined &&
          loginAuth?.proxy_id === undefined
        ) {
          this.router.navigate(['/auth/login']);
        } else {
          this.usuario_id = loginAuth.usuario_id;
        }
      })
    );

    this.authFacade.getPerfilesUser(this.usuario_id);
    this.perfilesUsuario$ = this.authFacade
      .pefilesUsuario$()
      .pipe(map(perfiles => (this.perfilesUsuario = perfiles)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshLogin(): void {
    const proxy_id = +this.formPerfil.get('proxyperfil').value;
    const nombre_perfil_select = this.perfilesUsuario.filter(
      perfil => perfil.id === proxy_id
    )[0].model_perfil_id.nombre;
    const nombre_rol_select = this.perfilesUsuario.filter(
      perfil => perfil.id === proxy_id
    )[0].model_perfil_id.model_rol_id.slug;

    this.authFacade.setPerfilSelectedLogin(
      +proxy_id,
      nombre_perfil_select,
      nombre_rol_select
    );
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.authFacade.reset();
    this.cubicacionFacade.resetData();
    this.otFacade.resetData();
    this.profileFacade.resetData();
    this.userFacade.resetData();
    this.router.navigate(['/auth/login']);
  }
}
