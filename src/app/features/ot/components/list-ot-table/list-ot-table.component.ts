import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
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
export class ListOtTableComponent implements OnDestroy {
  subscription: Subscription = new Subscription();

  @Input() data: OT[];
  @Input() table_id: string;

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
