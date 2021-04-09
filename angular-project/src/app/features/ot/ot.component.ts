import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { scaleDownFromRight, scaleDownFromLeft, fromLeftEasing, fromTopEasing, fromBottomEasing } from 'ngx-router-animations';

@Component({
  selector: 'app-ot',
  templateUrl: './ot.component.html',
  styleUrls: ['./ot.component.scss'],
  animations: [
    trigger('rotateCarousel', [
      transition('list-ot => form-ot', useAnimation(fromTopEasing)),
      transition('form-ot => list-ot', useAnimation(fromBottomEasing)),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getState(outlet): void {
    return outlet.activatedRouteData.state;
  }

}

