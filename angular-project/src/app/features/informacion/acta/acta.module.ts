import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActaRoutingModule } from './acta-routing.module';
import { ActaComponent } from './acta.component';
import { UiModule } from '@uiOT/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActaGestorComponent } from './acta-gestor/acta-gestor.component';
import { ActaJerarquiaComponent } from './acta-jerarquia/acta-jerarquia.component';

import { ActaTotalFormComponent } from './component/acta-total-form/acta-total-form.component';
import { ActaServicioFormComponent } from './component/acta-servicio-form/acta-servicio-form.component';

@NgModule({
  declarations: [
    ActaComponent,
    ActaGestorComponent,
    ActaJerarquiaComponent,
    ActaTotalFormComponent,
    ActaServicioFormComponent,
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
