import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormUsuarioContainerComponent } from './containers/form-usuario-container/form-usuario-container.component';
import { ListUsuarioContainerComponent } from './containers/list-usuario-container/list-usuario-container.component';
import { ListPerfilesUsuarioContainerComponent } from './containers/list-perfiles-usuario-container/list-perfiles-usuario-container.component';
import { UsuarioComponent } from './usuario.component';
const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children: [
      { path: '', redirectTo: 'list-usuarios', pathMatch: 'full' },
      {
        path: 'list-usuarios',
        component: ListUsuarioContainerComponent,
      },
      {
        path: 'form-usuario',
        component: FormUsuarioContainerComponent,
      },
      {
        path: 'form-usuario/:id',
        component: FormUsuarioContainerComponent,
      },
      {
        path: 'list-perfiles-usuario/:id',
        component: ListPerfilesUsuarioContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
