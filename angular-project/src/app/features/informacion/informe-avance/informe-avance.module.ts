import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformeAvanceRoutingModule } from './informe-avance-routing.module';
import { InformeAvanceComponent } from './informe-avance.component';
import { UiModule } from '@uiOT/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InformeTrabajadorComponent } from './informe-trabajador/informe-trabajador.component';

@NgModule({
  declarations: [InformeAvanceComponent, InformeTrabajadorComponent],
  imports: [
    CommonModule,
    InformeAvanceRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class InformeAvanceModule {}
