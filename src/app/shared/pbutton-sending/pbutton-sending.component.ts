import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'zwc-pbutton-sending',
  templateUrl: './pbutton-sending.component.html',
  styleUrls: ['./pbutton-sending.component.scss'],
})
export class PbuttonSendingComponent implements OnInit {
  @Input() sending: boolean;
  @Input() Pdisabled: boolean;
  @Input() Pid: string;
  @Input() content: string;
  @Input() Pclass: string;
  @Input() icon: string = '';
  @Output() call = new EventEmitter<void>();

  // ICONS
  iconSelected: any;
  saveIcon = faFloppyDisk;
  constructor() {}

  ngOnInit(): void {
    if (this.icon === 'save') {
      this.iconSelected = this.saveIcon;
    }
  }

  callClick(): void {
    this.call.emit();
  }
}
