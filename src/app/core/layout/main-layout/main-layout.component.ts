import {
  Component,
  OnInit,
  ElementRef,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'zwc-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

// TODO: HACER UN MENU PARA LA ADMINISTRACIÓN
// TODO: VER QUE HACER CON EL MENU DE OT Y CUBICACION EN LA ADMINISTRACION
export class MainLayoutComponent implements OnInit, OnDestroy {
  isLoggin$: Observable<boolean> = this.authFacade.isLoggin$();
  resizeObservable$: Observable<Event> = fromEvent(window, 'resize');
  subscription: Subscription = new Subscription();

  constructor(
    private authFacade: AuthFacade,
    private el: ElementRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.resizeObservable$.subscribe(e => {
        let myTag = this.el.nativeElement.querySelector('.layout-container');
        if (window.innerWidth > 991) {
          myTag.classList.remove('layout-mobile-active');
        }
      })
    );
  }

  toggle() {
    if (this.getInnerWidth() < 991) {
      this.setClassListToggle('layout-mobile-active', 'layout-static-inactive');
    } else {
      this.setClassListToggle('layout-static-inactive', 'layout-mobile-active');
    }
  }

  closeToggle(): void {
    let myTag = this.el.nativeElement.querySelector('.layout-container');
    myTag.classList.remove('layout-mobile-active');
  }

  logout(): void {
    this.authFacade.Logout();
  }

  changePerfil(): void {
    this.authFacade.resetPerfil();
    this.router.navigate(['/login/perfil-select']);
  }

  getInnerWidth(): number {
    return window.innerWidth;
  }

  setClassListToggle(primario: string, secundario: string) {
    let myTag = this.el.nativeElement.querySelector('.layout-container');
    myTag.classList.toggle(primario);
    myTag.classList.toggle(secundario, false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
