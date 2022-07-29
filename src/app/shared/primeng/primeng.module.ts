import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [InputTextModule, CardModule, PasswordModule, ButtonModule],
  exports: [InputTextModule, CardModule, PasswordModule, ButtonModule],
})
export class PrimeNgModule {}
