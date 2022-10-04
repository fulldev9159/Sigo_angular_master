import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtDetalleRoutingModule } from './ot-detalle-routing.module';
import { OtDetalleComponent } from './ot-detalle.component';
import { SharedModule } from '@sharedOT/shared.module';

@NgModule({
  declarations: [OtDetalleComponent],
  imports: [CommonModule, OtDetalleRoutingModule, SharedModule],
})
export class OtDetalleModule {}
