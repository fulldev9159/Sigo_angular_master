import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiciosAdicionalesComponent } from './servicios-adicionales.component';

const routes: Routes = [{ path: '', component: ServiciosAdicionalesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosAdicionalesRoutingModule {}
