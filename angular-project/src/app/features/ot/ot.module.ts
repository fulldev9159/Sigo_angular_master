import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtRoutingModule } from './ot-routing.module';
import { OtComponent } from './ot.component';
import { ListOtComponent } from './container/list-ot/list-ot.component';
import { FormOtComponent } from './container/form-ot/form-ot.component';

import { UiModule } from '@uiOT/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CDetalleOtComponent } from './container/c-detalle-ot/c-detalle-ot.component';
import { DetalleOtComponent } from './component/detalle-ot/detalle-ot.component';
import { AssignCoordinatorFormComponent } from './component/assign-coordinator-form/assign-coordinator-form.component';
import { DetalleLpusComponent } from '@featureOT/cubicacion/component/detalle-lpus/detalle-lpus.component';
import { AssignTrabajadorFormComponent } from './component/assign-trabajador-form/assign-trabajador-form.component';
import { GeneralFormComponent } from './forms/general-form/general-form.component';
import { PlanProyectoFormComponent } from './forms/plan-proyecto-form/plan-proyecto-form.component';
import { SustentoFinancieroFormComponent } from './forms/sustento-financiero-form/sustento-financiero-form.component';
import { ExtrasFormComponent } from './forms/extras-form/extras-form.component';
import { NumeroInternoFormComponent } from './forms/numero-interno-form/numero-interno-form.component';
import { CubicacionDetailComponent } from './component/cubicacion-detail/cubicacion-detail.component';
import { PlanProyectoDetailComponent } from './component/plan-proyecto-detail/plan-proyecto-detail.component';
import { DetalleAdjudicacionFormComponent } from './forms/detalle-adjudicacion-form/detalle-adjudicacion-form.component';
import { RegistrarLibroObraComponent } from './component/registrar-libro-obra/registrar-libro-obra';

@NgModule({
  declarations: [
    OtComponent,
    ListOtComponent,
    FormOtComponent,
    CDetalleOtComponent,
    DetalleOtComponent,
    AssignCoordinatorFormComponent,
    DetalleLpusComponent,
    AssignTrabajadorFormComponent,
    GeneralFormComponent,
    PlanProyectoFormComponent,
    SustentoFinancieroFormComponent,
    ExtrasFormComponent,
    NumeroInternoFormComponent,
    CubicacionDetailComponent,
    PlanProyectoDetailComponent,
    DetalleAdjudicacionFormComponent,
    RegistrarLibroObraComponent,
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
