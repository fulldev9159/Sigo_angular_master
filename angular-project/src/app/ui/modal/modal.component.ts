import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  @Input() public display: boolean;
  @Output() public CloseEvent: EventEmitter<any> = new EventEmitter();
  private destroyInstance: Subject<boolean> = new Subject();
  constructor() {}

  ngOnInit(): void {}

  close(): void {
    this.CloseEvent.emit();
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }
}
