import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ListProComponent } from './container/list-pro/list-pro.component';
import { FormProComponent } from './container/form-pro/form-pro.component';
import { FormComponent } from './component/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@uiOT/ui.module';

@NgModule({
  declarations: [
    ProfileComponent,
    ListProComponent,
    FormProComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
