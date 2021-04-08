import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() public display: boolean;
  @Output() public CloseEvent: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  close(): void {
    this.CloseEvent.emit();
  }
}
