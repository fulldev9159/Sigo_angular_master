import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmPopupModule,
    DropdownModule,
    ListboxModule,
    TableModule,
    TooltipModule,
    DialogModule,
    DividerModule,
    CalendarModule,
    InputTextareaModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmPopupModule,
    DropdownModule,
    ListboxModule,
    TableModule,
    TooltipModule,
    DialogModule,
    DividerModule,
    CalendarModule,
    InputTextareaModule,
  ],
})
export class SharedModule {}
