import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoCosteoComponent } from './info-costeo.component';

const routes: Routes = [{ path: '', component: InfoCosteoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoCosteoRoutingModule { }
