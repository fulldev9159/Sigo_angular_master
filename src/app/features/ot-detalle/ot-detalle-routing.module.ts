import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleOTResolver } from 'src/app/core/resolvers/detalleOT.resolver';
import { AnexosComponent } from './components/anexos/anexos.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { LibroObrasComponent } from './components/libro-obras/libro-obras.component';
import { OtDetalleComponent } from './ot-detalle.component';
// 128 TODO: AGREGAR NOT FOUND PAGE PARA RUTAS NO ENCONTRADAS
const routes: Routes = [
  {
    path: '',
    component: OtDetalleComponent,
    children: [
      { path: '', redirectTo: 'informacion', pathMatch: 'full' },
      {
        path: 'informacion/:id',
        component: InformacionComponent,
        resolve: {
          detalleOT: DetalleOTResolver,
        },
      },
      {
        path: 'libro-obras/:id',
        component: LibroObrasComponent,
      },
      {
        path: 'anexos/:id',
        component: AnexosComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtDetalleRoutingModule {}
