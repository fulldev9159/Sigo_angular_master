import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from '@core';
import { environment } from '@environment';

import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule.forRoot(environment), AppRoutingModule],
  providers: [{ provide: 'environment', useValue: environment }],
  bootstrap: [AppComponent],
})
export class AppModule {}
