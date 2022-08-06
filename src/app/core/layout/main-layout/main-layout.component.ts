import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'zwc-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  isLoggin$: Observable<boolean> = this.authFacade.isLoggin$();

  resizeObservable$: Observable<Event> = fromEvent(window, 'resize');
  subscription: Subscription = new Subscription();

  constructor(private authFacade: AuthFacade, private el: ElementRef) {}

  ngOnInit() {
    this.subscription.add(
      this.resizeObservable$.subscribe(e => {
        let myTag = this.el.nativeElement.querySelector('.layout-container');
        if (window.innerWidth < 991) {
          console.log('mobile');
        } else {
          console.log('desktop');
          myTag.classList.remove('layout-mobile-active');
        }
      })
    );
  }

  toggle() {
    let myTag = this.el.nativeElement.querySelector('.layout-container');
    if (window.innerWidth < 991) {
      if (!myTag.classList.contains('layout-mobile-active')) {
        myTag.classList.remove('layout-static-inactive');
        myTag.classList.add('layout-mobile-active');
      } else {
        myTag.classList.remove('layout-mobile-active');
      }
    } else {
      if (!myTag.classList.contains('layout-static-inactive')) {
        myTag.classList.remove('layout-mobile-active');
        myTag.classList.add('layout-static-inactive');
      } else {
        myTag.classList.remove('layout-static-inactive');
      }
    }
  }

  close(): void {
    let myTag = this.el.nativeElement.querySelector('.layout-container');
    myTag.classList.remove('layout-mobile-active');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
