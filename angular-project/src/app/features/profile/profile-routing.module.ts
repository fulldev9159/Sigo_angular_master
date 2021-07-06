import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormProComponent } from './container/form-pro/form-pro.component';
import { ListProComponent } from './container/list-pro/list-pro.component';
import { ProfileComponent } from './profile.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'list-pro', pathMatch: 'full' },
      {
        path: 'list-pro',
        component: ListProComponent,
        data: { state: 'list-pro' },
      },
      {
        path: 'form-pro',
        component: FormProComponent,
        data: { state: 'form-pro' },
      },
      {
        path: 'form-pro/:id',
        component: FormProComponent,
        data: { state: 'form-pro' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
