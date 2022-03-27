import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ListUserComponent } from './container/list-user/list-user.component';
import { FormUserComponent } from './container/form-user/form-user.component';

import { UiModule } from '@uiOT/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPerfilesUserComponent } from './container/list-perfiles-user/list-perfiles-user.component';

@NgModule({
  declarations: [
    UserComponent,
    ListUserComponent,
    FormUserComponent,
    ListPerfilesUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
