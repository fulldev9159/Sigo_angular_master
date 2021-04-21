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
      // {
      //   path: 'test',
      //   loadChildren: () => import('../test/test.module').then(m => m.TestModule)
      // },
      // {
      //   path: 'test2',
      //   loadChildren: () => import('../test2/test2.module').then(m => m.Test2Module)
      // },
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
