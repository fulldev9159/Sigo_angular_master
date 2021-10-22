import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoCosteoRoutingModule } from './info-costeo-routing.module';
import { InfoCosteoComponent } from './info-costeo.component';


@NgModule({
  declarations: [InfoCosteoComponent],
  imports: [
    CommonModule,
    InfoCosteoRoutingModule
  ]
})
export class InfoCosteoModule { }
