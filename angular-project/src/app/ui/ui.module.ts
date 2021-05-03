import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './primeng/primeng.module';

// Services


// Components
import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { SeleccionComponent } from './seleccion/seleccion.component';
import { ModalComponent } from './modal/modal.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ToastComponent } from './toast/toast.component';
import { ConfirmationService } from 'primeng/api';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { MessageModule } from 'primeng/message';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgModule,
    NgxPermissionsModule
  ],
  declarations: [
    CardComponent,
    TableComponent,
    SeleccionComponent,
    ModalComponent,
    DatepickerComponent,
    ToastComponent,
    ProgressBarComponent,
  ],
  exports: [
    CardComponent,
    PrimeNgModule,
    SeleccionComponent,
    TableComponent,
    ModalComponent,
    DatepickerComponent,
    ToastComponent,
    ProgressBarComponent,
    NgxPermissionsModule
  ],
  providers: [ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UiModule { }
