import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CubicacionRoutingModule } from './cubicacion-routing.module';
import { CubicacionComponent } from './cubicacion.component';
import { UiModule } from '@uiOT/ui.module';
import { ListCubComponent } from './container/list-cub/list-cub.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CloneCubageFormComponent } from './forms/clone-cubage-form/clone-cubage-form.component';
import { FormCubContainerComponent } from './container/form-cub/form-cub.component';
import { DetalleCubicacionTableComponent } from './component/detalle-cubicacion-table/detalle-cubicacion-table.component';

// import { AutocompleteLibModule } from 'angular-ng-autocomplete';
// import { GeneralFormService } from './service/general-form.service';
// import { ContratoOrdinarioLpusTableComponent } from './component/contrato-ordinario-lpus-table/contrato-ordinario-lpus-table.component';
// import { ContratoOrdinarioFormComponent } from './forms/contrato-ordinario-form/contrato-ordinario-form.component';

@NgModule({
  declarations: [
    CubicacionComponent,
    ListCubComponent,
    FormCubContainerComponent,
    CloneCubageFormComponent,
    DetalleCubicacionTableComponent,
    // ContratoOrdinarioFormComponent,
    // ContratoOrdinarioLpusTableComponent,
  ],
  imports: [
    CommonModule,
    CubicacionRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    // AutocompleteLibModule,
  ],
  // providers: [GeneralFormService],
})
export class CubicacionModule {}
