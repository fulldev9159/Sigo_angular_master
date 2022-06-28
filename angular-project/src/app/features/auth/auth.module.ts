import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { PerfilSelectComponent } from './perfil-select/perfil-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@uiOT/ui.module';
import { NgxCaptchaModule } from 'ngx-captcha';

// import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
// import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
@NgModule({
  declarations: [LoginComponent, PerfilSelectComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    NgxCaptchaModule,
    // RecaptchaModule,
    // RecaptchaFormsModule,
    // RecaptchaV3Module,
  ],
  // providers: [
  //   {
  //     provide: RECAPTCHA_V3_SITE_KEY,
  //     useValue: '6LcLQEcfAAAAAD7GhJ0XQeoyoNg99u11XVrQyBta',
  //   },
  // ],
})
export class AuthModule {}
