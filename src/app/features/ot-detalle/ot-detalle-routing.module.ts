import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccionesOTResolver } from 'src/app/core/resolvers/accionesOT.resolver';
import { DetalleOTResolver } from 'src/app/core/resolvers/detalleOT.resolver';
import { RegistroLibroLobrasResolver } from 'src/app/core/resolvers/registrosLibroObras.resolver';
import { DetalleCubicacionResolver } from '../cubicacion/resolvers/detalle-cubicacion.resolver';
import { AnexosComponent } from './components/anexos/anexos.component';
import { CosteoComponent } from './components/costeo/costeo.component';
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
          accionesOT: AccionesOTResolver,
        },
      },
      {
        path: 'costeos/:id',
        component: CosteoComponent,
        resolve: {
          detalleOT: DetalleOTResolver,
          cubicacion: DetalleCubicacionResolver,
        },
      },
      {
        path: 'libro-obras/:id',
        component: LibroObrasComponent,
        resolve: {
          registroLibroObras: RegistroLibroLobrasResolver,
          detalleOT: DetalleOTResolver,
        },
      },
      {
        path: 'anexos/:id',
        component: AnexosComponent,
        resolve: {
          registroLibroObras: RegistroLibroLobrasResolver,
          detalleOT: DetalleOTResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtDetalleRoutingModule {}
