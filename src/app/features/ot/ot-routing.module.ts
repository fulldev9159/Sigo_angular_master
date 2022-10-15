import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratosUsuarioResolver } from 'src/app/core/resolvers/contratos-usuario.resolver';
import { FormOtContainerComponent } from './containers/form-ot-container/form-ot-container.component';
import { ListOtContainerComponent } from './containers/list-ot-container/list-ot-container.component';
import { OtComponent } from './ot.component';
import { CategoriaArchivosResolver } from './resolvers/categoriaArchivos.resolver';

const routes: Routes = [
  {
    path: '',
    component: OtComponent,
    children: [
      { path: '', redirectTo: 'list-ot', pathMatch: 'full' },
      {
        path: 'list-ot',
        component: ListOtContainerComponent,
        resolve: {
          categoriaArchivos: CategoriaArchivosResolver,
        },
      },
      {
        path: 'form-ot',
        component: FormOtContainerComponent,
        resolve: {
          contratosUsuario: ContratosUsuarioResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtRoutingModule {}
