import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
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
  ],
  exports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    ListboxModule,
    CalendarModule,
    DialogModule,
  ],
})
export class PrimeNgModule {}
