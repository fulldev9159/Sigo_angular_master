import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'zwc-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  siteKey = '6LdRuREgAAAAAIfMrVUFg9ZI4rt2nSenIu9jd0Zj';
  production: boolean;

  formLoginControls = {
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    recaptcha: new FormControl(null),
  };
  formLogin: FormGroup = new FormGroup(this.formLoginControls);

  constructor(@Inject('environment') environment: any) {
    this.production = environment.production;
  }

  ngOnInit(): void {
    if (this.production) {
      this.formLogin.get('recaptcha').setValidators([Validators.required]);
    }
  }

  resolved(event: any): void {}
}
