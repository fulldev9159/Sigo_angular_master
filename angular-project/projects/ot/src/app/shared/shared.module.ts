import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ConfirmPopupModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ConfirmPopupModule],
})
export class SharedModule {}
