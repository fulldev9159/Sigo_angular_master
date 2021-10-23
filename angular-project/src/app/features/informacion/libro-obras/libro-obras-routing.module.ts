import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibroObrasComponent } from './libro-obras.component';

const routes: Routes = [{ path: '', component: LibroObrasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibroObrasRoutingModule { }
