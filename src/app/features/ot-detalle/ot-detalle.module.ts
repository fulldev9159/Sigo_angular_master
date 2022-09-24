import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtDetalleRoutingModule } from './ot-detalle-routing.module';
import { OtDetalleComponent } from './ot-detalle.component';
import { InformeAvanceComponent } from './components/informe-avance/informe-avance.component';
import { SharedModule } from '@sharedOT/shared.module';

@NgModule({
  declarations: [OtDetalleComponent, InformeAvanceComponent],
  imports: [CommonModule, OtDetalleRoutingModule, SharedModule],
})
export class OtDetalleModule {}
