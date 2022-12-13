import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformeAvanceRoutingModule } from './informe-avance-routing.module';
import { InformeAvanceComponent } from './components/informe-avance/informe-avance.component';
import { SharedModule } from '@sharedOT/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubirEvidenciasFormComponent } from './components/subir-evidencias-form/subir-evidencias-form.component';

@NgModule({
  declarations: [InformeAvanceComponent, SubirEvidenciasFormComponent],
  imports: [
    CommonModule,
    InformeAvanceRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class InformeAvanceModule {}
