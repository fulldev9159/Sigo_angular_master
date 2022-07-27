import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './primeng/primeng.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [],
  imports: [CommonModule, PrimeNgModule, FontAwesomeModule, ButtonModule],
  exports: [PrimeNgModule, FontAwesomeModule, ButtonModule],
})
export class SharedModule {
  static forRoot(environment: any): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [{ provide: 'environment', useValue: environment }],
    };
  }
}
