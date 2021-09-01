import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {
  @Input() label = '';
  @Input() icon = '';
  disabled = false;
  @Input('disabled')
  set disabledInput(disabled: boolean) {
    this.disabled = disabled;
    this.disabledChanged.emit({
      target: this,
      disabled,
    });
  }
  active = false;

  @Output() disabledChanged = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
