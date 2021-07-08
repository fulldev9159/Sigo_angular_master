import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label = '';
  @Input() errorMessageFn = errors => 'Este campo es inválido';

  constructor() {}

  ngOnInit(): void {}
}
