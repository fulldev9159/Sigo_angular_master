import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CubicacionRoutingModule } from './cubicacion-routing.module';
import { CubicacionComponent } from './cubicacion.component';
import { UiModule } from '@uiOT/ui.module';
import { ListCubComponent } from './container/list-cub/list-cub.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CloneCubageFormComponent } from './forms/clone-cubage-form/clone-cubage-form.component';
import { ContratoOrdinarioFormComponent } from './forms/contrato-ordinario-form/contrato-ordinario-form.component';
import { FormCubContainerComponent } from './container/form-cub/form-cub.component';
import { ContratoMovilFormComponent } from './forms/contrato-movil-form/contrato-movil-form.component';
import { GeneralFormComponent } from './forms/general-form/general-form.component';
import { GeneralFormService } from './service/general-form.service';
import { ContratoOrdinarioLpusTableComponent } from './component/contrato-ordinario-lpus-table/contrato-ordinario-lpus-table.component';
import { ContratoMovilLpusTableComponent } from './component/contrato-movil-lpus-table/contrato-movil-lpus-table.component';
import { DetalleCubicacionTableComponent } from './component/detalle-cubicacion-table/detalle-cubicacion-table.component';

@NgModule({
  declarations: [
    CubicacionComponent,
    ListCubComponent,
    FormCubContainerComponent,
    CloneCubageFormComponent,
    ContratoOrdinarioFormComponent,
    FormCubContainerComponent,
    ContratoMovilFormComponent,
    GeneralFormComponent,
    ContratoOrdinarioLpusTableComponent,
    ContratoMovilLpusTableComponent,
    DetalleCubicacionTableComponent,
  ],
  imports: [
    CommonModule,
    CubicacionRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
  ],
  providers: [GeneralFormService],
})
export class CubicacionModule {}
