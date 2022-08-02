import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActaRoutingModule } from './acta-routing.module';
import { ActaComponent } from './acta.component';
import { UiModule } from '@uiOT/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenararActaComponent } from './generar-acta/generar-acta.component';
import { ValidarActaComponent } from './validar-acta/validar-acta.component';

import { ActaTotalFormComponent } from './component/acta-total-form/acta-total-form.component';
import { ActaPorcentajeFormComponent } from './component/acta-porcentaje-form/acta-porcentaje-form.component';
import { ActaServicioFormComponent } from './component/acta-servicio-form/acta-servicio-form.component';
import { ValidarPagoComponent } from './validar-pago/validar-pago.component';

@NgModule({
  declarations: [
    ActaComponent,
    GenararActaComponent,
    ValidarActaComponent,
    ActaTotalFormComponent,
    ActaPorcentajeFormComponent,
    ActaServicioFormComponent,
    ValidarPagoComponent,
  ],
  imports: [
    CommonModule,
    ActaRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ActaModule {}
