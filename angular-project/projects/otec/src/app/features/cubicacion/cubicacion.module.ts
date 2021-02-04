import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { CubicacionRoutingModule } from './cubicacion-routing.module';
import { CubicacionComponent } from './cubicacion.component';
import { CrearCubicacionComponent } from './crear-cubicacion/crear-cubicacion.component';

@NgModule({
  declarations: [CubicacionComponent, CrearCubicacionComponent],
  imports: [CommonModule, CubicacionRoutingModule, SharedModule],
})
export class CubicacionModule {}
