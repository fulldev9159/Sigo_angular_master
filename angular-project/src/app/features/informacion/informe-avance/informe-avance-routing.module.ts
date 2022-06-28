import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformeAvanceComponent } from './informe-avance.component';
import { InformeAvanceResolver } from './resolvers/informe-avance.resolver';

const routes: Routes = [
  {
    path: '',
    component: InformeAvanceComponent,
    resolve: {
      detalle: InformeAvanceResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformeAvanceRoutingModule {}
