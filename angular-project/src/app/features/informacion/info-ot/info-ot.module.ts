import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoOtRoutingModule } from './info-ot-routing.module';
import { InfoOtComponent } from './info-ot.component';
import { UiModule } from '@uiOT/ui.module';

@NgModule({
  declarations: [InfoOtComponent],
  imports: [CommonModule, InfoOtRoutingModule, UiModule],
})
export class InfoOtModule {}
