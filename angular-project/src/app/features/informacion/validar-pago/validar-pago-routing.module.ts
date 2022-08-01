import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidarPagoComponent } from './validar-pago.component';

const routes: Routes = [{ path: '', component: ValidarPagoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidarPagoRoutingModule {}
