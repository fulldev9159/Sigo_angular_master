import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCubComponent } from './containers/form-cub/form-cub.component';
import { ListCubComponent } from './containers/list-cub/list-cub.component';
import { CubicacionComponent } from './cubicacion.component';
import { ContratosUsuarioResolver } from './resolvers/contratos-usuario.resolver';
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
      },
      {
        path: 'form-cub',
        component: FormCubComponent,
        resolve: {
          contratosUsuario: ContratosUsuarioResolver,
          tipoCubicacion: TipoCubicacionResolver,
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
