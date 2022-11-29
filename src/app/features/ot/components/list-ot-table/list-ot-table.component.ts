import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faFilter, faPassport } from '@fortawesome/free-solid-svg-icons';
import { OT } from '@model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-list-ot-table',
  templateUrl: './list-ot-table.component.html',
  styleUrls: ['./list-ot-table.component.scss'],
})
export class ListOtTableComponent implements OnChanges, OnDestroy {
  subscription: Subscription = new Subscription();

  @Input() data: OT[];
  @Input() table_id: string;
  @Input() currentPage = 0;
  @Output() currentPageChange: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  rows = 10;
  first = 0;

  filterIcon = faFilter;

  // FORMULARIO
  formFilterControl = {
    ot_id: new FormControl('', []),
    nombre: new FormControl('', []),
    contrato_marco: new FormControl(''),
    proveedor: new FormControl(''),
    gestor: new FormControl(''),
  };

  formFilter: FormGroup = new FormGroup(this.formFilterControl);

  actasIcon = faPassport;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateTableByPage(this.currentPage);
    }

    if (changes['currentPage']) {
      this.updateTableByPage(changes['currentPage'].currentValue);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
    this.currentPageChange.emit(this.currentPage);
    this.pageChanged.emit(this.currentPage);
  }

  updateTableByPage(page: number) {
    const pages = Math.ceil((this.data ?? []).length / this.rows);
    let first = 0;

    if (page > pages) {
      this.setCurrentPage(pages);
      first = pages * this.rows;
    } else {
      first = page * this.rows;
    }

    this.first = first < 0 ? 0 : first;
  }

  paginationEvent(event: { first: number; rows: number }): void {
    this.setCurrentPage(event.first / event.rows);
  }
}
