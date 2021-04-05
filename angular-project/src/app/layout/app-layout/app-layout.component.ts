import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent implements OnInit {
  public toggleState = false;
  public toggle = 'd-flex';

  constructor() {}

  ngOnInit(): void {}

  toggleAction(): void {
    switch (true) {
      case this.toggleState === false:
        this.toggle = 'd-flex';
        break;
      case this.toggleState === true:
        this.toggle = 'd-flex toggled';
        break;
    }
  }
}
