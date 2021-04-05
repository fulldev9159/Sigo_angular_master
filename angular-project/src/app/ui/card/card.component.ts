import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  // animations: [simpliAnimationFade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  // declarations
  @Input() public classCard: string;
  @Input() public classCardHeader: string;
  @Output() outputAction: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  clickOutputAction(): void {
    this.outputAction.emit();
  }
}
