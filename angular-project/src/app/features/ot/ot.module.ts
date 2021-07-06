import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtRoutingModule } from './ot-routing.module';
import { OtComponent } from './ot.component';
import { ListOtComponent } from './container/list-ot/list-ot.component';
import { FormOtComponent } from './container/form-ot/form-ot.component';
import { UiModule } from '@uiOT/ui.module';
import { FormComponent } from './component/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './component/detail/detail.component';

@NgModule({
  declarations: [
    OtComponent,
    ListOtComponent,
    FormOtComponent,
    FormComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    OtRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class OtModule {}
