import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  imports: [
    InputTextModule,
    CardModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    ProgressSpinnerModule,
  ],
  exports: [
    InputTextModule,
    CardModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    ProgressSpinnerModule,
  ],
})
export class PrimeNgModule {}
