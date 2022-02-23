import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { PerfilSelectComponent } from './perfil-select/perfil-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@uiOT/ui.module';

@NgModule({
  declarations: [LoginComponent, PerfilSelectComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
  ],
})
export class AuthModule {}
