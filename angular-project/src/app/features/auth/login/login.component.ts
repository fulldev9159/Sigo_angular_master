import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  public formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authFacade.getLogin$().subscribe(loginAuth => {
        if (
          loginAuth?.token !== undefined &&
          loginAuth?.proxy_id === undefined
        ) {
          this.router.navigate(['/auth/perfil-select']);
        }
      })
    );

    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initForm(): void {
    this.formLogin = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login(): void {
    this.authFacade.postLogin(this.formLogin.value);
  }
}
