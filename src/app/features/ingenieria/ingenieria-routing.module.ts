import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleCubicacionFromOTResolver } from 'src/app/core/resolvers/detalleCubicacionFromOT.resolver';
import { DetalleOTResolver } from 'src/app/core/resolvers/detalleOT.resolver';
import { ResultadoIngenieriaContainerComponent } from './containers/resultado-ingenieria-container/resultado-ingenieria-container.component';
const routes: Routes = [
  { path: '', redirectTo: 'resultado-ingenieria', pathMatch: 'full' },
  {
    path: 'resultado-ingenieria/:id',
    component: ResultadoIngenieriaContainerComponent,
    resolve: {
      detalleOT: DetalleOTResolver,
      cubicacion: DetalleCubicacionFromOTResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngenieriaRoutingModule {}
