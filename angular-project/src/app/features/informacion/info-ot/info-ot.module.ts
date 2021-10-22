import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoOtRoutingModule } from './info-ot-routing.module';
import { InfoOtComponent } from './info-ot.component';


@NgModule({
  declarations: [InfoOtComponent],
  imports: [
    CommonModule,
    InfoOtRoutingModule
  ]
})
export class InfoOtModule { }
