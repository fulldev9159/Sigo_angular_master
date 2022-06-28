import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformeAvanceRoutingModule } from './informe-avance-routing.module';
import { InformeAvanceComponent } from './informe-avance.component';
import { UiModule } from '@uiOT/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InformeTrabajadorComponent } from './informe-trabajador/informe-trabajador.component';
import { InformeAdmincontratoComponent } from './informe-admincontrato/informe-admincontrato.component';
import { InputColorDirective } from '@utilsSIGO/input-color.directive';

@NgModule({
  declarations: [
    InformeAvanceComponent,
    InformeTrabajadorComponent,
    InformeAdmincontratoComponent,
    InputColorDirective,
  ],
  imports: [
    CommonModule,
    InformeAvanceRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class InformeAvanceModule {}
