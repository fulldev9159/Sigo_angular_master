import { NgModule } from '@angular/core';
import { SharedModule } from '@sharedOT/shared.module';
import { CubicacionRoutingModule } from './cubicacion-routing.module';
import { CubicacionComponent } from './cubicacion.component';
import { CrearCubicacionComponent } from './crear-cubicacion/crear-cubicacion.component';
import { DetalleCubicacionComponent } from './detalle-cubicacion/detalle-cubicacion.component';

@NgModule({
  declarations: [CubicacionComponent, CrearCubicacionComponent, DetalleCubicacionComponent],
  imports: [SharedModule, CubicacionRoutingModule],
})
export class CubicacionModule {}
