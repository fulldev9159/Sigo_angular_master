import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'zwc-view-confirmacion',
  templateUrl: './view-confirmacion.component.html',
  styleUrls: ['./view-confirmacion.component.scss'],
})
export class ViewConfirmacionComponent {
  @Input() pregunta: string;
  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();
  constructor() {}

  confirmarInt(): void {
    this.confirmar.emit();
  }

  cancelarInt(): void {
    this.cancelar.emit();
  }
}
