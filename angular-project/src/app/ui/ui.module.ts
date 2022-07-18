import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from './primeng/primeng.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Services

// Components
import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { ModalComponent } from './modal/modal.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ToastComponent } from './toast/toast.component';
import { ConfirmationService } from 'primeng/api';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { MenuComponent } from './menu/menu.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SelectComponent } from './select/select.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { TabComponent } from './tabs/tab.component';
import { TabsComponent } from './tabs/tabs.component';
import { InputBuildComponent } from './input/component/input-build.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    NgxPermissionsModule,
    FontAwesomeModule,
  ],
  declarations: [
    CardComponent,
    TableComponent,
    ModalComponent,
    DatepickerComponent,
    ToastComponent,
    ProgressBarComponent,
    MenuComponent,
    SelectComponent,
    InputComponent,
    TextareaComponent,
    TabComponent,
    TabsComponent,
    InputBuildComponent,
  ],
  exports: [
    CardComponent,
    PrimeNgModule,
    TableComponent,
    ModalComponent,
    DatepickerComponent,
    ToastComponent,
    ProgressBarComponent,
    MenuComponent,
    NgxPermissionsModule,
    SelectComponent,
    InputComponent,
    TextareaComponent,
    TabComponent,
    TabsComponent,
    InputBuildComponent,
    FontAwesomeModule,
  ],
  providers: [ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiModule {}
