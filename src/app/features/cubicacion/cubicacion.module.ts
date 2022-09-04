import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CubicacionRoutingModule } from './cubicacion-routing.module';
import { CubicacionComponent } from './cubicacion.component';
import { SharedModule } from '@sharedOT/shared.module';
import { ListCubComponent } from './containers/list-cub/list-cub.component';
import { FormCubContainerComponent } from './containers/form-cub/form-cub-container.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { TableServicesComponent } from './components/table-services/table-services.component';
import { BaseTdComponent } from './components/table-services/components/base-td/base-td.component';
import { MultiTdComponent } from './components/table-services/components/multi-td/multi-td.component';
import { TableListComponent } from './components/table-list-cub/table-list-cub.component';
import { TableFiltersListCubComponent } from './components/table-list-cub/components/table-filters-list-cub/table-filters-list-cub.component';

@NgModule({
  declarations: [
    CubicacionComponent,
    ListCubComponent,
    FormCubContainerComponent,
    FormularioComponent,
    TableServicesComponent,
    BaseTdComponent,
    MultiTdComponent,
    TableListComponent,
    TableFiltersListCubComponent,
  ],
  imports: [
    CommonModule,
    CubicacionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CubicacionModule {}
