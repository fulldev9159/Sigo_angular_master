import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccionesOTResolver } from 'src/app/core/resolvers/accionesOT.resolver';
import { DetalleCubicacionFromOTResolver } from 'src/app/core/resolvers/detalleCubicacionFromOT.resolver';
import { DetalleCubicacionIngFromOTResolver } from 'src/app/core/resolvers/detalleCubicacionIngFromOT.resolver';
import { DetalleOTResolver } from 'src/app/core/resolvers/detalleOT.resolver';
import { ResultadoIngenieriaContainerComponent } from './containers/resultado-ingenieria-container/resultado-ingenieria-container.component';
import { ValidarIngenieriaContainerComponent } from './containers/validar-ingenieria-container/validar-ingenieria-container.component';
const routes: Routes = [
  { path: '', redirectTo: 'resultado-ingenieria', pathMatch: 'full' },
  {
    path: 'resultado-ingenieria/:id',
    component: ResultadoIngenieriaContainerComponent,
    resolve: {
      detalleOT: DetalleOTResolver,
      // cubicacion: DetalleCubicacionFromOTResolver,
      cubicacionIngenieria: DetalleCubicacionIngFromOTResolver,
      accionesOT: AccionesOTResolver,
    },
  },
  {
    path: 'validar-ingenieria/:id',
    component: ValidarIngenieriaContainerComponent,
    resolve: {
      detalleOT: DetalleOTResolver,
      cubicacionIngenieria: DetalleCubicacionIngFromOTResolver,
      accionesOT: AccionesOTResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngenieriaRoutingModule {}
