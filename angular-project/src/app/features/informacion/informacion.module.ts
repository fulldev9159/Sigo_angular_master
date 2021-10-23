import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformacionRoutingModule } from './informacion-routing.module';
import { InformacionComponent } from './informacion.component';
import { UiModule } from '@uiOT/ui.module';

@NgModule({
  declarations: [InformacionComponent],
  imports: [CommonModule, InformacionRoutingModule, UiModule],
})
export class InformacionModule {}
