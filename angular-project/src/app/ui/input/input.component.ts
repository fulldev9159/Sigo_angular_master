import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label = '';
  @Input() placeholder = '';
  @Input('type') inputType = 'text';
  @Input() errorMessageFn = errors => 'Este campo es inválido';

  constructor() {}

  ngOnInit(): void {}
}
