import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardTokenGuard } from '@utilsSIGO/guard-token.guard';
import { AppLayoutComponent } from 'src/app/layout/app-layout/app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'ot',
        pathMatch: 'full',
      },
      {
        path: 'ot',
        loadChildren: () => import('../ot/ot.module').then(m => m.OtModule),
        canActivate: [GuardTokenGuard]
        // canLoad: [GuardTokenGuard]
      },
      {
        path: 'cubicacion',
        loadChildren: () => import('../cubicacion/cubicacion.module').then(m => m.CubicacionModule),
        canActivate: [GuardTokenGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
        canActivate: [GuardTokenGuard]
      },
      {
        path: 'kitui',
        loadChildren: () => import('../kitui/kitui.module').then(m => m.KituiModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
