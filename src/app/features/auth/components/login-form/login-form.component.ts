import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'zwc-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  siteKey = '6LdRuREgAAAAAIfMrVUFg9ZI4rt2nSenIu9jd0Zj';
  production: boolean;
  faUser = faUser;

  formLoginControls = {
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    recaptcha: new FormControl(null),
  };
  formLogin: FormGroup = new FormGroup(this.formLoginControls);

  sendingLogin$: Observable<boolean> = this.loadingFacade.sendigLoading$();

  constructor(
    @Inject('environment') environment: any,
    private authFacade: AuthFacade,
    private loadingFacade: LoadingsFacade
  ) {
    this.production = environment.production;
  }

  ngOnInit(): void {
    if (this.production) {
      this.formLogin.get('recaptcha').setValidators([Validators.required]);
    }
  }

  login(): void {
    const { username, password } = this.formLogin.getRawValue();
    this.authFacade.Login(username, password);
  }

  resolved(event: any): void {}
}
