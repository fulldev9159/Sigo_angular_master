import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnexosRoutingModule } from './anexos-routing.module';
import { AnexosComponent } from './anexos.component';
import { UiModule } from '@uiOT/ui.module';

@NgModule({
  declarations: [AnexosComponent],
  imports: [CommonModule, AnexosRoutingModule, UiModule],
})
export class AnexosModule {}
