import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'zwc-pdropdown',
  templateUrl: './pdropdown.component.html',
  styleUrls: ['./pdropdown.component.scss'],
})
export class PdropdownComponent {
  @Input() Label = '';
  @Input() dropdown_id = '';
  @Input() control: FormControl;
  @Input() data: any;
  @Input() Pplaceholder = '';
  @Input() loading = false;
  @Input() Pfilter = false;
  @Input() PfilterBy = '';
  @Input() PshowClear = false;
  @Input() Pdisabled = false;
  @Input() optionLabel = 'name';
  @Input() optionValue = 'code';
  constructor() {}
}
