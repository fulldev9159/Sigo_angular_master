import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './primeng/primeng.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputAlertComponent } from './input-alert/input-alert.component';
import { PbuttonSendingComponent } from './pbutton-sending/pbutton-sending.component';

@NgModule({
  declarations: [InputAlertComponent, PbuttonSendingComponent],
  imports: [CommonModule, PrimeNgModule, FontAwesomeModule],
  exports: [
    PrimeNgModule,
    FontAwesomeModule,
    InputAlertComponent,
    PbuttonSendingComponent,
  ],
})
export class SharedModule {
  static forRoot(environment: any): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [{ provide: 'environment', useValue: environment }],
    };
  }
}
