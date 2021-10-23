import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformeAvanceRoutingModule } from './informe-avance-routing.module';
import { InformeAvanceComponent } from './informe-avance.component';


@NgModule({
  declarations: [InformeAvanceComponent],
  imports: [
    CommonModule,
    InformeAvanceRoutingModule
  ]
})
export class InformeAvanceModule { }
