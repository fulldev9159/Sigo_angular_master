import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit, OnDestroy {
  // declarations
  MenuItems: MenuItem[];
  @Input() public item: any[];
  @Input() public rowIndex: any;
  @Input() public actions: any[];
  private destroyInstance: Subject<boolean> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.MenuItems = this.actions.map((x) => {
      let label = '';
      if (x.labelVariable) {
        label = this.item[x.label] ? 'Bloquear' : 'Activar';
      } else {
        label = x.label;
      }
      return {
        label,
        icon: x.icon,
        command: ($event) =>
          x.onClick($event.originalEvent, this.item, this.rowIndex),
      };
    });
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }
}
