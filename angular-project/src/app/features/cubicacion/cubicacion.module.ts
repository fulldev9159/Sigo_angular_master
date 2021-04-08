import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CubicacionRoutingModule } from './cubicacion-routing.module';
import { CubicacionComponent } from './cubicacion.component';
import { UiModule } from '@uiOT/ui.module';

@NgModule({
  declarations: [CubicacionComponent],
  imports: [
    CommonModule,
    CubicacionRoutingModule,
    UiModule
  ]
})
export class CubicacionModule { }
