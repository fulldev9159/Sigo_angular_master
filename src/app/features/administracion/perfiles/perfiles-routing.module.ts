import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPerfilesContainerComponent } from './containers/form-perfiles-container/form-perfiles-container.component';
import { ListPerfilesContainerComponent } from './containers/list-perfiles-container/list-perfiles-container.component';
import { PerfilesComponent } from './perfiles.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilesComponent,
    children: [
      { path: '', redirectTo: 'list-perfiles', pathMatch: 'full' },
      {
        path: 'list-perfiles',
        component: ListPerfilesContainerComponent,
      },
      {
        path: 'form-perfiles',
        component: FormPerfilesContainerComponent,
      },
      {
        path: 'form-perfiles/:id',
        component: FormPerfilesContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilesRoutingModule {}
