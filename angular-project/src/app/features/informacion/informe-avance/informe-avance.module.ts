import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformeAvanceRoutingModule } from './informe-avance-routing.module';
import { InformeAvanceComponent } from './informe-avance.component';
import { UiModule } from '@uiOT/ui.module';

@NgModule({
  declarations: [InformeAvanceComponent],
  imports: [CommonModule, InformeAvanceRoutingModule, UiModule],
})
export class InformeAvanceModule {}
