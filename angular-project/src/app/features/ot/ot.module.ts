import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtRoutingModule } from './ot-routing.module';
import { OtComponent } from './ot.component';
import { ListOtComponent } from './container/list-ot/list-ot.component';
import { FormOtComponent } from './container/form-ot/form-ot.component';
import { UiModule } from '@uiOT/ui.module';
import { FormComponent } from './component/form/form.component';


@NgModule({
  declarations: [OtComponent, ListOtComponent, FormOtComponent, FormComponent],
  imports: [
    CommonModule,
    OtRoutingModule,
    UiModule
  ]
})
export class OtModule { }
