import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { LoadingService } from '@utilsSIGO/service-progress';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent implements OnInit, OnDestroy {

  public loading;
  public toggleState = false;
  public toggle = 'd-flex';
  private destroyInstance$: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private _loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.listenToLoading();
  }

  ngOnDestroy(): void {
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
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

  logout() {
    localStorage.removeItem('auth');
    this.authFacade.postLoginSuccess(null);
    this.router.navigate(['/auth/login']);
  }
}
