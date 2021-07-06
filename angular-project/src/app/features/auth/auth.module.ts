import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@uiOT/ui.module';

@NgModule({
  declarations: [LoginComponent, RecoveryComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
  ],
})
export class AuthModule {}
