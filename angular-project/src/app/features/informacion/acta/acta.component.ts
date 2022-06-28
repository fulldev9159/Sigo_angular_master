import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-acta',
  templateUrl: './acta.component.html',
  styleUrls: ['./acta.component.scss'],
})
export class ActaComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  loginAuth$: Observable<any>;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.loginAuth$ = this.authFacade.getLogin$().pipe(
      map(loginAuth => {
        let auth;
        if (loginAuth) {
          // const perm = loginAuth.perfiles[0].permisos.map(x => x.slug);
          // this.permissionsService.loadPermissions(perm);
          // const nameArray = loginAuth.usuario_nombre.split(' ');
          auth = {
            ...loginAuth,
            // name: `${nameArray[0]} ${nameArray[2]}`,
            name: loginAuth.usuario_nombre,
            perfil: loginAuth.nombre_perfil_select,
          };
        }
        return auth;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
