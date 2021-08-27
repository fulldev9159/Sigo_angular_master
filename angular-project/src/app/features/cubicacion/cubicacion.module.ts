import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CubicacionRoutingModule } from './cubicacion-routing.module';
import { CubicacionComponent } from './cubicacion.component';
import { UiModule } from '@uiOT/ui.module';
import { ListCubComponent } from './container/list-cub/list-cub.component';
import { FormCubContainerComponent } from './container/form-cub/form-cub-container.component';
// import { DetalleLpusComponent } from '@featureOT/cubicacion/component/detalle-lpus/detalle-lpus.component';
import { FormComponent } from './component/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CloneCubageFormComponent } from './component/clone-cubage-form/clone-cubage-form.component';
import { ContratoOrdinarioFormComponent } from './forms/contrato-ordinario-form/contrato-ordinario-form.component';
import { FormCub2Component } from './container/form-cub2/form-cub2.component';
import { ContratoMovilFormComponent } from './forms/contrato-movil-form/contrato-movil-form.component';
import { GeneralFormComponent } from './forms/general-form/general-form.component';
import { GeneralFormService } from './service/general-form.service';

@NgModule({
  declarations: [
    CubicacionComponent,
    ListCubComponent,
    FormCubContainerComponent,
    FormComponent,
    CloneCubageFormComponent,
    ContratoOrdinarioFormComponent,
    FormCub2Component,
    ContratoMovilFormComponent,
    GeneralFormComponent,
    // DetalleLpusComponent
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
