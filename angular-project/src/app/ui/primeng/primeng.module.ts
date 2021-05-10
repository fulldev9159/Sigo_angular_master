import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    ListboxModule,
    CalendarModule,
    DialogModule,
    ConfirmPopupModule,
    ProgressBarModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    CheckboxModule,
    RadioButtonModule,
    MultiSelectModule,
    InputMaskModule,
    TooltipModule,
    OverlayPanelModule
  ],
  exports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    ListboxModule,
    CalendarModule,
    DialogModule,
    ConfirmPopupModule,
    ProgressBarModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    CheckboxModule,
    RadioButtonModule,
    MultiSelectModule,
    InputMaskModule,
    TooltipModule,
    OverlayPanelModule
  ],
  providers: [MessageService],
})
export class PrimeNgModule { }
