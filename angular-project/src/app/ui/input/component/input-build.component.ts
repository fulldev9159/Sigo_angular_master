import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-builder',
  templateUrl: './input-build.component.html',
  styleUrls: ['./input-build.component.scss'],
})
export class InputBuildComponent implements OnInit {
  @Input() control: FormControl;
  @Input() Name = '';
  @Input() Type = 'text';
  @Input() Min = '';
  @Input() errorMessageFn;
  @Input() index_service = null;
  @Input() index_uo = null;
  @Output() changeInput = new EventEmitter<{
    value: number;
    index_service: any;
    index_uo: any;
  }>();

  constructor() {}

  ngOnInit(): void {}

  input(event: any, index_service: any, index_uo: any) {
    console.log('org value', event.value);
    console.log('org i serv', index_service);
    console.log('org i uo', index_uo);
    this.changeInput.emit({ value: event.value, index_service, index_uo });
  }
}
