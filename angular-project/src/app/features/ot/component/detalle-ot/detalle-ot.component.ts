import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import * as otModel from '@storeOT/features/ot/ot.model';

@Component({
  selector: 'app-detalle-ot',
  templateUrl: './detalle-ot.component.html',
  styleUrls: ['./detalle-ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleOtComponent implements OnInit, OnDestroy {
  // declarations
  @Input() formOt: any;
  @Input() detalleOt: otModel.DataRspDetalleOT;
  private destroyInstance: Subject<boolean> = new Subject();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }
}
