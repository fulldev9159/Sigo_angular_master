import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@coreOT';
import { environment } from '@environment';
@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule.forRoot(environment), AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
