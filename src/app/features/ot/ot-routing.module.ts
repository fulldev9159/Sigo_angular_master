import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtComponent } from './ot.component';

const routes: Routes = [{ path: '', component: OtComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtRoutingModule { }
