import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidarPagoRoutingModule } from './validar-pago-routing.module';
import { UiModule } from '@uiOT/ui.module';
import { ValidarPagoComponent } from './validar-pago.component';

@NgModule({
  declarations: [ValidarPagoComponent],
  imports: [CommonModule, ValidarPagoRoutingModule, UiModule],
})
export class ValidarPagoModule {}
