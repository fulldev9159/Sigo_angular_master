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
  ],
})
export class SharedModule {}
