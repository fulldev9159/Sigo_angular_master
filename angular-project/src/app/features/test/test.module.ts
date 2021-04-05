import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { UiModule } from 'src/app/ui/ui.module';
import { ListTestComponent } from './container/list-test.component';


@NgModule({
  declarations: [TestComponent, ListTestComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    UiModule,
    SelectButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestModule { }
