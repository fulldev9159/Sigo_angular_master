import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActaComponent } from './acta.component';

const routes: Routes = [{ path: '', component: ActaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActaRoutingModule { }
