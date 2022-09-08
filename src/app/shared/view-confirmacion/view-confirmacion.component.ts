import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faSquareCheck,
  faSquareXmark,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'zwc-view-confirmacion',
  templateUrl: './view-confirmacion.component.html',
  styleUrls: ['./view-confirmacion.component.scss'],
})
export class ViewConfirmacionComponent {
  @Input() pregunta: string;
  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();
  checkIcon = faSquareCheck;
  cancelIcon = faSquareXmark;

  constructor() {}

  confirmarInt(): void {
    this.confirmar.emit();
  }

  cancelarInt(): void {
    this.cancelar.emit();
  }
}
