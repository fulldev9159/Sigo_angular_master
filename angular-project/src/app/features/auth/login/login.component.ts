import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
// import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  public formLogin: FormGroup;
  siteKey = '6LcLQEcfAAAAAD7GhJ0XQeoyoNg99u11XVrQyBta';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authFacade: AuthFacade
  ) // private recaptchaV3Service: ReCaptchaV3Service
  {}

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
      // recaptchaReactive: new FormControl(null, Validators.required),
    });
  }

  // public addTokenLog(message: string, token: string | null) {
  //   console.log(`${message}: ${this.formatToken(token)}`);
  // }

  // public formatToken(token: string | null) {
  //   return token !== null
  //     ? `${token.substr(0, 7)}...${token.substr(-7)}`
  //     : 'null';
  // }

  login(): void {
    this.authFacade.postLogin(this.formLogin.value);
  }
}
