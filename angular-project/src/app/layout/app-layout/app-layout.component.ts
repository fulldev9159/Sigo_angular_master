import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from '@utilsSIGO/service-progress';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent implements OnInit {

  public loading;
  public toggleState = false;
  public toggle = 'd-flex';

  constructor(private _loading: LoadingService) {}

  ngOnInit(): void {
    this.listenToLoading();
  }

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

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
