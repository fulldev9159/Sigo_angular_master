import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'src/app/layout/app-layout/app-layout.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'cubicacion',
        loadChildren: () =>
          import('../cubicacion/cubicacion.module').then(
            m => m.CubicacionModule
          ),
      },
      {
        path: 'ot',
        loadChildren: () => import('../ot/ot.module').then(m => m.OtModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../user/user.module').then(m => m.UserModule),
      },
      {
        path: 'informacion',
        loadChildren: () =>
          import('../informacion/informacion.module').then(
            m => m.InformacionModule
          ),
      },
      {
        path: 'area',
        loadChildren: () =>
          import('../area/area.module').then(m => m.AreaModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
