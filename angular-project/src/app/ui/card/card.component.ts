import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit, OnDestroy {

  // declarations
  @Input() public classCard: string;
  @Input() public classCardHeader: string;
  @Output() outputAction: EventEmitter<any> = new EventEmitter();
  private destroyInstance: Subject<boolean> = new Subject();

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }

}
