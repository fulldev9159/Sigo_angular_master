import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './primeng/primeng.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputAlertComponent } from './input-alert/input-alert.component';
import { PbuttonSendingComponent } from './pbutton-sending/pbutton-sending.component';
import { ContentLayoutComponent } from '../core/layout/content-layout/content-layout.component';
import { InputTextComponent } from './input-text/input-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdropdownComponent } from './pdropdown/pdropdown.component';
import { FormAgregarServiciosComponent } from './form-agregar-servicios/form-agregar-servicios.component';
import { FormTableServicesComponent } from './form-table-services/form-table-services.component';
import { BaseTdComponent } from './form-table-services/components/base-td/base-td.component';
import { MultiTdComponent } from './form-table-services/components/multi-td/multi-td.component';
import { ViewConfirmacionComponent } from './view-confirmacion/view-confirmacion.component';
import {
  ViewServiceTableComponent,
  ViewTableServicesComponent,
  ViewUOTableComponent,
} from './view-table-services/view-table-services.component';
import { ColorPrecargadoDirective } from './directives/color-precargado.directive';
import { ViewRechazoComponent } from './view-rechazo/view-rechazo.component';
import { TableAgregarServiciosComponent } from './table-agregar-servicios/table-agregar-servicios.component';
import { ExperimentalTableComponent } from './experimental-table/experimental-table.component';
import { TableServiciosComponent } from './table-servicios/table-servicios.component';

@NgModule({
  declarations: [
    InputAlertComponent,
    PbuttonSendingComponent,
    ContentLayoutComponent,
    InputTextComponent,
    PdropdownComponent,
    FormAgregarServiciosComponent,
    FormTableServicesComponent,
    BaseTdComponent,
    MultiTdComponent,
    ViewConfirmacionComponent,
    ViewTableServicesComponent,
    ViewUOTableComponent,
    ViewServiceTableComponent,
    ColorPrecargadoDirective,
    ViewRechazoComponent,
    TableAgregarServiciosComponent,
    TableServiciosComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PrimeNgModule,
    FontAwesomeModule,
    InputAlertComponent,
    PbuttonSendingComponent,
    ContentLayoutComponent,
    InputTextComponent,
    PdropdownComponent,
    FormAgregarServiciosComponent,
    FormTableServicesComponent,
    ViewConfirmacionComponent,
    ViewTableServicesComponent,
    ColorPrecargadoDirective,
    ViewRechazoComponent,
    TableAgregarServiciosComponent,
    TableServiciosComponent,
  ],
})
export class SharedModule {
  static forRoot(environment: any): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [{ provide: 'environment', useValue: environment }],
    };
  }
}
