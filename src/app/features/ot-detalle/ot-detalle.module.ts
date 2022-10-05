import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtDetalleRoutingModule } from './ot-detalle-routing.module';
import { OtDetalleComponent } from './ot-detalle.component';
import { SharedModule } from '@sharedOT/shared.module';
import { LibroObrasComponent } from './components/libro-obras/libro-obras.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { AnexosComponent } from './components/anexos/anexos.component';

@NgModule({
  declarations: [OtDetalleComponent, LibroObrasComponent, InformacionComponent, AnexosComponent],
  imports: [CommonModule, OtDetalleRoutingModule, SharedModule],
})
export class OtDetalleModule {}
