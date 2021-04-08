import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SeleccionType } from '@uiOT/seleccion/seleccion.model';
@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.scss'],
})
export class SeleccionComponent implements OnInit {
  @Input() public items: SeleccionType[];
  @Input() public textSeleccion?: string;
  @Output() selected: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  itemSelected(event: Event): void {
    console.log((event.target as HTMLInputElement).value);
    this.selected.emit(event);
  }
}
