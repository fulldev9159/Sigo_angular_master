import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCubContainerComponent } from './containers/form-cub/form-cub-container.component';
import { ListCubComponent } from './containers/list-cub/list-cub.component';
import { CubicacionComponent } from './cubicacion.component';
import { ContratosUsuarioResolver } from '../../core/resolvers/contratos-usuario.resolver';
import { CubicacionesResolver } from './resolvers/cubicaciones.resolver';
import { DetalleCubicacionResolver } from './resolvers/detalle-cubicacion.resolver';
import { TipoCubicacionResolver } from './resolvers/tipo-cubicacion.resolver';

const routes: Routes = [
  {
    path: '',
    component: CubicacionComponent,
    children: [
      { path: '', redirectTo: 'list-cub', pathMatch: 'full' },
      {
        path: 'list-cub',
        component: ListCubComponent,
        resolve: {
          cubicaciones: CubicacionesResolver,
        },
      },
      {
        path: 'form-cub',
        component: FormCubContainerComponent,
        resolve: {
          contratosUsuario: ContratosUsuarioResolver,
          tipoCubicacion: TipoCubicacionResolver,
        },
      },
      {
        path: 'form-cub/:id',
        component: FormCubContainerComponent,
        resolve: {
          contratosUsuario: ContratosUsuarioResolver,
          tipoCubicacion: TipoCubicacionResolver,
          detalleCubicacion: DetalleCubicacionResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CubicacionRoutingModule {}
