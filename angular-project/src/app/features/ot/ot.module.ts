import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtRoutingModule } from './ot-routing.module';
import { OtComponent } from './ot.component';
import { ListOtComponent } from './container/list-ot/list-ot.component';
import { FormOtComponent } from './container/form-ot/form-ot.component';
import { FormOt2Component } from './container/form-ot2/form-ot.component';

import { UiModule } from '@uiOT/ui.module';
import { FormComponent } from './component/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './component/detail/detail.component';
import { CDetalleOtComponent } from './container/c-detalle-ot/c-detalle-ot.component';
import { DetalleOtComponent } from './component/detalle-ot/detalle-ot.component';
import { AssignCoordinatorFormComponent } from './component/assign-coordinator-form/assign-coordinator-form.component';
import { DetalleLpusComponent } from '@featureOT/cubicacion/component/detalle-lpus/detalle-lpus.component';
import { AssignTrabajadorFormComponent } from './component/assign-trabajador-form/assign-trabajador-form.component';

@NgModule({
  declarations: [
    OtComponent,
    ListOtComponent,
    FormOtComponent,
    FormOt2Component,
    FormComponent,
    DetailComponent,
    CDetalleOtComponent,
    DetalleOtComponent,
    AssignCoordinatorFormComponent,
    DetalleLpusComponent,
    AssignTrabajadorFormComponent,
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
