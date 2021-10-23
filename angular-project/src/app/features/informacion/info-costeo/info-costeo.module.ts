import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoCosteoRoutingModule } from './info-costeo-routing.module';
import { InfoCosteoComponent } from './info-costeo.component';
import { UiModule } from '@uiOT/ui.module';

@NgModule({
  declarations: [InfoCosteoComponent],
  imports: [CommonModule, InfoCosteoRoutingModule, UiModule],
})
export class InfoCosteoModule {}
