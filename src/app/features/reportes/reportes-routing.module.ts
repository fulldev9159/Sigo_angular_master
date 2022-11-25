import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtsAsignadasComponent } from './containers/ots-asignadas/ots-asignadas.component';
import { ReportesComponent } from './reportes.component';

const routes: Routes = [
  {
    path: '',
    component: ReportesComponent,
    children: [
      { path: '', redirectTo: 'ot', pathMatch: 'full' },
      {
        path: 'ot',
        component: OtsAsignadasComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
