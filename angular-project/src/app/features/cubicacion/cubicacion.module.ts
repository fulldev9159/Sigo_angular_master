import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CubicacionRoutingModule } from './cubicacion-routing.module';
import { CubicacionComponent } from './cubicacion.component';


@NgModule({
  declarations: [CubicacionComponent],
  imports: [
    CommonModule,
    CubicacionRoutingModule
  ]
})
export class CubicacionModule { }
