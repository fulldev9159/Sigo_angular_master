import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilesUser } from '@data';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil-select',
  templateUrl: './perfil-select.component.html',
  styleUrls: ['./perfil-select.component.scss'],
})
export class PerfilSelectComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  perfiles$: Observable<PerfilesUser[]>;

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
    this.perfiles$ = this.authFacade.pefilesUsuario$();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
