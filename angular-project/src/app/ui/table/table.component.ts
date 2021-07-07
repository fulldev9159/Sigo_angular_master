import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';

import { Config } from './config';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {
  // declarations
  @Input() public config: Config;
  @Input() public items: any[];
  private destroyInstance: Subject<boolean> = new Subject();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
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
}
