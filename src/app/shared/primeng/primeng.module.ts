import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@NgModule({
  imports: [InputTextModule, CardModule],
  exports: [InputTextModule, CardModule],
})
export class PrimeNgModule {}
