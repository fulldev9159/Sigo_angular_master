import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtRoutingModule } from './ot-routing.module';
import { OtComponent } from './ot.component';


@NgModule({
  declarations: [
    OtComponent
  ],
  imports: [
    CommonModule,
    OtRoutingModule
  ]
})
export class OtModule { }
