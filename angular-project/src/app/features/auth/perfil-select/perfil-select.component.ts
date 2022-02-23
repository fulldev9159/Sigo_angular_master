import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-perfil-select',
  templateUrl: './perfil-select.component.html',
  styleUrls: ['./perfil-select.component.scss'],
})
export class PerfilSelectComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  constructor(private router: Router, private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authFacade
        .getLogin$()
        // .pipe(
        //   map(
        //     loginAuth =>
        //       loginAuth !== null &&
        //       loginAuth.token &&
        //       loginAuth.usuario_id !== 0
        //   )
        // )
        .subscribe(loginAuth => {
          console.log(loginAuth);
          if (
            loginAuth?.token === undefined &&
            loginAuth?.proxy_id === undefined
          ) {
            this.router.navigate(['/auth/login']);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
