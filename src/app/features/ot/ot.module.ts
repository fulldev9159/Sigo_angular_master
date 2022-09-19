import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtRoutingModule } from './ot-routing.module';
import { OtComponent } from './ot.component';
import { FormOtContainerComponent } from './containers/form-ot-container/form-ot-container.component';
import { ListOtContainerComponent } from './containers/list-ot-container/list-ot-container.component';
import { SharedModule } from '@sharedOT/shared.module';
import { FormularioOtBaseComponent } from './components/formulario-ot-base/formulario-ot-base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioOtBucleComponent } from './components/formulario-ot-bucle/formulario-ot-bucle.component';
import { FormularioOtOrdinarioComponent } from './components/formulario-ot-ordinario/formulario-ot-ordinario.component';
import { FormularioOtFijoComponent } from './components/formulario-ot-fijo/formulario-ot-fijo.component';
import { FormularioOtMovilComponent } from './components/formulario-ot-movil/formulario-ot-movil.component';
import { FormularioOtSustentoFinancieroComponent } from './components/formulario-ot-sustento-financiero/formulario-ot-sustento-financiero.component';
import { FormularioOtExtrasComponent } from './components/formulario-ot-extras/formulario-ot-extras.component';
import { ListOtFiltrosComponent } from './components/list-ot-filtros/list-ot-filtros.component';

@NgModule({
  declarations: [
    OtComponent,
    FormOtContainerComponent,
    ListOtContainerComponent,
    FormularioOtBaseComponent,
    FormularioOtBucleComponent,
    FormularioOtOrdinarioComponent,
    FormularioOtFijoComponent,
    FormularioOtMovilComponent,
    FormularioOtSustentoFinancieroComponent,
    FormularioOtExtrasComponent,
    ListOtFiltrosComponent,
  ],
  imports: [
    CommonModule,
    OtRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class OtModule {}
