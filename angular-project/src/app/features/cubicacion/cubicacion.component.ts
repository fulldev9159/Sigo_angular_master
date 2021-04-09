import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fromTopEasing, fromBottomEasing } from 'ngx-router-animations';

@Component({
  selector: 'app-cubicacion',
  templateUrl: './cubicacion.component.html',
  styleUrls: ['./cubicacion.component.scss'],
  animations: [
    trigger('rotateCarousel', [
      transition('list-cub => form-cub', useAnimation(fromTopEasing)),
      transition('form-cub => list-cub', useAnimation(fromBottomEasing)),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CubicacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
