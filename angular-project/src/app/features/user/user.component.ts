import { trigger, transition, useAnimation } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { scaleDownFromTop, scaleDownFromBottom } from 'ngx-router-animations';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  // animations: [
  //   trigger('rotateCarousel', [
  //     transition('list-user => form-user', useAnimation(scaleDownFromTop, {
  //       params: { enterTiming: '0.4', leaveTiming: '0.4', enterDelay: '0', leaveDelay: '0' }
  //     })),
  //     transition('form-user => list-user', useAnimation(scaleDownFromBottom, {
  //       params: { enterTiming: '0.4', leaveTiming: '0.4', enterDelay: '0', leaveDelay: '0' }
  //     })),
  //   ])
  // ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, OnDestroy {

  // declarations
  private destroyInstance$: Subject<boolean> = new Subject();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
  }

  getState(outlet): void {
    return outlet.activatedRouteData.state;
  }

}
