import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';

@NgModule({
  imports: [
    InputTextModule,
    CardModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    ProgressSpinnerModule,
    BreadcrumbModule,
    DividerModule,
    MessageModule,
    InputNumberModule,
    TableModule,
    DialogModule,
    TooltipModule,
    CalendarModule,
    RadioButtonModule,
    TabViewModule,
    TagModule,
  ],
  exports: [
    InputTextModule,
    CardModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    ProgressSpinnerModule,
    BreadcrumbModule,
    DividerModule,
    MessageModule,
    InputNumberModule,
    TableModule,
    DialogModule,
    TooltipModule,
    CalendarModule,
    RadioButtonModule,
    TabViewModule,
    TagModule,
  ],
})
export class PrimeNgModule {}
