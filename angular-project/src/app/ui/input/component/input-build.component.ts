import { Component, OnInit, Input } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {}
}
