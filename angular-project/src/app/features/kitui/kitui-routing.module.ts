import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KituiComponent } from './kitui.component';

const routes: Routes = [
  {
    path: '',
    component: KituiComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KituiRoutingModule {}
