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
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    CardComponent,
    TableComponent,
    SeleccionComponent,
    ModalComponent,
    DatepickerComponent,
    ToastComponent,
    PopupComponent,
  ],
  exports: [
    CardComponent,
    PrimeNgModule,
    SeleccionComponent,
    TableComponent,
    ModalComponent,
    DatepickerComponent,
    ToastComponent,
    PopupComponent,
  ],
  imports: [CommonModule, PrimeNgModule],
})
export class UiModule {}
