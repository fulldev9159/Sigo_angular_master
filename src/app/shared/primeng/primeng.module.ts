import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';

@NgModule({
  imports: [InputTextModule, CardModule, PasswordModule],
  exports: [InputTextModule, CardModule, PasswordModule],
})
export class PrimeNgModule {}
