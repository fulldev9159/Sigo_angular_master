import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormUserComponent } from './container/form-user/form-user.component';
import { ListUserComponent } from './container/list-user/list-user.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'list-user', pathMatch: 'full' },
      {
        path: 'list-user',
        component: ListUserComponent,
        data: { state: 'list-user' }
      },
      {
        path: 'form-user',
        component: FormUserComponent,
        data: { state: 'form-user' }
      },
      {
        path: 'form-user/:id',
        component: FormUserComponent,
        data: { state: 'form-user' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
