import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes.component';
import { SharedModule } from '@sharedOT/shared.module';
import { OtsAsignadasComponent } from './containers/ots-asignadas/ots-asignadas.component';

@NgModule({
  declarations: [ReportesComponent, OtsAsignadasComponent],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ReportesModule {}
