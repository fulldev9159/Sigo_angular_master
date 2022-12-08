import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@sharedOT/shared.module';
import { TableModule } from "primeng/table";
import { ImputacionRoutingModule } from './imputacion-routing.module';
import { ImputacionComponent } from './imputacion.component';
import { OtsPaymentComponent } from './containers/ots-payment/ots-payment.component';

@NgModule({
  declarations: [ImputacionComponent, OtsPaymentComponent],
  imports: [
    CommonModule,
    ImputacionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    HttpClientModule,
  ],
})
export class ImputacionModule {}