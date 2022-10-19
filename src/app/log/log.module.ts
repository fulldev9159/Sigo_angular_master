import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogService } from './services/log.service';
import { LogPublishersService } from './services/log.publishers.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LogService, LogPublishersService],
  exports: [],
})
export class LogModule {
  constructor(@Optional() @SkipSelf() parentModule: LogModule) {
    if (parentModule) {
      throw new Error(
        'LogModule has already been loaded. You should only import Core modules in the AppModule only.'
      );
    }
  }

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: LogModule,
      providers: [LogService, LogPublishersService],
    };
  }
}
