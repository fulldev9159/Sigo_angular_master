import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appZweiconPermission]',
})
export class ZweiconPermissionDirective implements OnInit {
  // declarations
  private currentUser;
  private permissions = [];
  private destroyInstance: Subject<boolean> = new Subject();

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.authFacade
      .getLogin$()
      .pipe(takeUntil(this.destroyInstance))
      .subscribe(loginAuth => {
        this.currentUser = loginAuth;
        this.updateView();
      });
  }

  private updateView(): void {
    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkPermission(): any {
    const hasPermission = true;

    if (this.currentUser && this.currentUser.permissions) {
      for (const checkPermission of this.permissions) {
        const permissionFound = this.currentUser.permissions.find(
          x => x.toUpperCase() === checkPermission.toUpperCase()
        );
      }
    }

    return hasPermission;
  }
}
