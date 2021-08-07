import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { Config } from './config';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  controls = {};
  form: FormGroup = new FormGroup(this.controls);

  @Input() public config: Config;

  items: any[] = [];
  @Input('items')
  set itemsInput(items: any[]) {
    this.items = items || [];

    this.controls = this.items.reduce(
      (ac, item, rowIndex) => ({
        ...ac,
        ...this.config.body.headers.reduce((ac2, header) => {
          if (header.type === 'INPUTNUMBER') {
            ac2[
              this.getControlName(rowIndex, header.header)
            ] = new FormControl(item[header.header] + '', [
              ...(header.validators || []),
            ]);
          }
          return ac2;
        }, {}),
      }),
      {}
    );

    this.form = new FormGroup(this.controls);

    Object.keys(this.controls).forEach(controlName => {
      this.subscription.add(
        this.form.get(controlName).valueChanges.subscribe(value => {
          const [rowIndex, header] = this.extractControlNameElements(
            controlName
          );

          const column = this.config.body.headers.find(
            col => col.header === header
          );

          if (column && column.onchange) {
            const item = this.items[rowIndex];
            column.onchange(
              {
                target: {
                  rowIndex,
                  controlName,
                  value,
                },
              },
              item
            );
          }
        })
      );
    });

    this.touch();
  }

  private destroyInstance: Subject<boolean> = new Subject();

  errorMessageFn = errors => 'Este campo es inválido';

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }

  typeAction(actions: any): string {
    return typeof actions;
  }

  context(actions: any): any {
    return {
      actions,
    };
  }

  getControlName(index: number, header: string): string {
    return `${index}_${header}`;
  }

  extractControlNameElements(controlName: string): string[] {
    return controlName.split('_');
  }

  touch(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);

      control.markAsTouched({
        onlySelf: true,
      });

      control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    });

    this.form.markAsTouched({
      onlySelf: true,
    });
  }

  get valid(): boolean {
    return this.form.valid;
  }
}
