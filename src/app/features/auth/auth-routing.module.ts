import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfiledGuard } from '@coreOT';
import { AuthTokenGuard } from 'src/app/core/guard/auth.guard';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PerfilSelectComponent } from './components/perfil-select/perfil-select.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
      },
      {
        path: 'auth',
        component: LoginFormComponent,
        canActivate: [AuthTokenGuard],
      },
      {
        path: 'perfil-select',
        component: PerfilSelectComponent,
        canActivate: [ProfiledGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
