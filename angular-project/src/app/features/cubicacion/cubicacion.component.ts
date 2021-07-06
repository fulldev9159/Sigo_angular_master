import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  fromTopEasing,
  fromBottomEasing,
  scaleDownFromBottom,
  scaleDownFromTop,
} from 'ngx-router-animations';

@Component({
  selector: 'app-cubicacion',
  templateUrl: './cubicacion.component.html',
  styleUrls: ['./cubicacion.component.scss'],
  animations: [
    trigger('rotateCarousel', [
      transition(
        'list-cub => form-cub',
        useAnimation(scaleDownFromTop, {
          params: {
            enterTiming: '0.4',
            leaveTiming: '0.4',
            enterDelay: '0',
            leaveDelay: '0',
          },
        })
      ),
      transition(
        'form-cub => list-cub',
        useAnimation(scaleDownFromBottom, {
          params: {
            enterTiming: '0.4',
            leaveTiming: '0.4',
            enterDelay: '0',
            leaveDelay: '0',
          },
        })
      ),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CubicacionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  getState(outlet): void {
    return outlet.activatedRouteData.state;
  }
}
