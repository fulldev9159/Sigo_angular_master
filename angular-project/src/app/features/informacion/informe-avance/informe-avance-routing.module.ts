import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformeAvanceComponent } from './informe-avance.component';

const routes: Routes = [{ path: '', component: InformeAvanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformeAvanceRoutingModule { }
