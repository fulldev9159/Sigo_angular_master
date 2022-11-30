import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadoIngenieriaContainerComponent } from './containers/resultado-ingenieria-container/resultado-ingenieria-container.component';
const routes: Routes = [
  { path: '', redirectTo: 'resultado-ingenieria', pathMatch: 'full' },
  {
    path: 'resultado-ingenieria/:id',
    component: ResultadoIngenieriaContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngenieriaRoutingModule {}
