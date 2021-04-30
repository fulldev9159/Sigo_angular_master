import { trigger, transition, useAnimation } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { scaleDownFromTop, scaleDownFromBottom } from 'ngx-router-animations';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('rotateCarousel', [
      transition('list-pro => form-pro', useAnimation(scaleDownFromTop, {
        params: { enterTiming: '0.4', leaveTiming: '0.4', enterDelay: '0', leaveDelay: '0' }
      })),
      transition('form-pro => list-pro', useAnimation(scaleDownFromBottom, {
        params: { enterTiming: '0.4', leaveTiming: '0.4', enterDelay: '0', leaveDelay: '0' }
      })),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {

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
