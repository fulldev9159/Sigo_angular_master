import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class DataModule {
  constructor(@Optional() @SkipSelf() parentModule: DataModule) {
    if (parentModule) {
      throw new Error(
        'DataModule has already been loaded. You should only import Core modules in the AppModule only.'
      );
    }
  }

  static forRoot(environment): ModuleWithProviders<any> {
    return {
      ngModule: DataModule,
      providers: [
        { provide: 'environment', useValue: environment },
        AuthService,
      ],
    };
  }
}
