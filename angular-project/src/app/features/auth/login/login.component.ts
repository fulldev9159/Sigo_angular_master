import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
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
import { map, timeout } from 'rxjs/operators';
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
  produccion: boolean;

  siteKey = '6LdRuREgAAAAAIfMrVUFg9ZI4rt2nSenIu9jd0Zj';
  // '6LcLQEcfAAAAAD7GhJ0XQeoyoNg99u11XVrQyBta';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authFacade: AuthFacade,
    @Inject('environment') environment,
    private detector: ChangeDetectorRef
  ) {
    this.produccion = environment.production;
  }

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
    if (this.produccion) {
      this.formLogin.get('recaptcha').setValidators([Validators.required]);
    }

    setTimeout(() => {
      this.detector.detectChanges();
    }, 700);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initForm(): void {
    this.formLogin = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      recaptcha: [null],
    });
  }

  login(): void {
    this.authFacade.postLogin(this.formLogin.value);
  }

  handleReset(): void {}
  handleExpire(): void {}
  handleError(): void {}
  handleLoad(): void {}
  handleSuccess(event: any): void {}
}
