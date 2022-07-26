import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { SharedModule } from '@sharedOT/shared.module';
import { environment } from '@environment';

@NgModule({
  declarations: [AuthComponent, LoginFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule.forRoot(environment),
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
})
export class AuthModule {}
