import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'zwc-pbutton-sending',
  templateUrl: './pbutton-sending.component.html',
  styleUrls: ['./pbutton-sending.component.scss'],
})
export class PbuttonSendingComponent {
  @Input() sending: boolean;
  @Input() Pdisabled: boolean;
  @Input() Pid: string;
  @Input() content: string;
  @Input() Pclass: string;
  @Output() call = new EventEmitter<void>();

  constructor() {}

  callClick(): void {
    this.call.emit();
  }
}
