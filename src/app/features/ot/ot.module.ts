import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtRoutingModule } from './ot-routing.module';
import { OtComponent } from './ot.component';
import { FormOtContainerComponent } from './containers/form-ot-container/form-ot-container.component';
import { ListOtContainerComponent } from './containers/list-ot-container/list-ot-container.component';
import { SharedModule } from '@sharedOT/shared.module';
import { FormularioOtBaseComponent } from './components/formulario-ot-base/formulario-ot-base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OtComponent,
    FormOtContainerComponent,
    ListOtContainerComponent,
    FormularioOtBaseComponent,
  ],
  imports: [
    CommonModule,
    OtRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class OtModule {}
