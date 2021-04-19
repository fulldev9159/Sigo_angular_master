import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './primeng/primeng.module';

// Components
import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { SeleccionComponent } from './seleccion/seleccion.component';
import { ModalComponent } from './modal/modal.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  declarations: [
    CardComponent,
    TableComponent,
    SeleccionComponent,
    ModalComponent,
    DatepickerComponent,
    ToastComponent,
  ],
  exports: [
    CardComponent,
    PrimeNgModule,
    SeleccionComponent,
    TableComponent,
    ModalComponent,
    DatepickerComponent,
    ToastComponent,
  ]
})
export class UiModule { }
