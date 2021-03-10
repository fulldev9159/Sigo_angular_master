import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [BrowserModule, CommonModule, BrowserAnimationsModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. You should only import Core modules in the AppModule only.'
      );
    }
  }

  static forRoot(environment: object): ModuleWithProviders<NgModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: 'environment', useValue: environment }
      ],
    };
  }
}
