import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SeleccionType } from '@uiOT/seleccion/seleccion.model';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.scss'],
})
export class SeleccionComponent implements OnInit, OnDestroy {

  // declarations
  @Input() public items: SeleccionType[];
  @Input() public type: string;
  @Input() public textSeleccion?: string;
  @Output() selected: EventEmitter<any> = new EventEmitter();
  private destroyInstance: Subject<boolean> = new Subject();

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }

  itemSelected(event: Event | object): void {
    if (this.type === 'select') {
      this.selected.emit(((event as Event).target as HTMLInputElement).value);
    } else if (this.type === 'listbox') {
      const key = 'value';
      this.selected.emit(event[key]);
    }
  }
}
