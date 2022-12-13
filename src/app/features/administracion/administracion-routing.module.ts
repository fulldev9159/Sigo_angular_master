import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./usuario/usuario.module').then(m => m.UsuarioModule),
  },
  {
    path: 'perfiles',
    loadChildren: () =>
      import('./perfiles/perfiles.module').then(m => m.PerfilesModule),
  },
  {
    path: 'areas',
    loadChildren: () => import('./areas/areas.module').then(m => m.AreasModule),
  },
  {
    path: 'contratos',
    loadChildren: () =>
      import('./contratos/contratos.module').then(m => m.ContratosModule),
  },
  {
    path: 'proyectos',
    loadChildren: () =>
      import('./proyectos/proyectos.module').then(m => m.ProyectosModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionRoutingModule {}
