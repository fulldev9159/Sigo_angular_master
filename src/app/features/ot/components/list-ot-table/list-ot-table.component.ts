import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { OT } from '@model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-list-ot-table',
  templateUrl: './list-ot-table.component.html',
  styleUrls: ['./list-ot-table.component.scss'],
})
export class ListOtTableComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  @Input() data: OT[];

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

  constructor() {}

  ngOnInit(): void {
    console.log();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
