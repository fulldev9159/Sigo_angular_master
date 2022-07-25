import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PrimeNgModule } from '@sharedOT/primeng/primeng.module';

@NgModule({
  declarations: [AuthComponent, LoginFormComponent],
  imports: [CommonModule, AuthRoutingModule, PrimeNgModule],
})
export class AuthModule {}
