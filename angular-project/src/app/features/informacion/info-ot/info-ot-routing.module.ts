import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoOtComponent } from './info-ot.component';

const routes: Routes = [{ path: '', component: InfoOtComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoOtRoutingModule { }
