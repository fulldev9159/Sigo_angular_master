import { TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { routes } from './app-routing.module';

describe('AppRoutingModule', () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
      declarations: [AppComponent],
    });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('navegate to "" redirects you to /login', (done) => {
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/login');
      done();
    });
  });

  it('navegate to "login" redirects you to /login', (done) => {
    router.navigate(['/login']).then(() => {
      expect(location.path()).toBe('/login');
      done();
    });
  });
});
