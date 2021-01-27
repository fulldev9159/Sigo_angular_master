import { TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { routes } from './app-routing.module';

describe('AppRoutingModule', () => {
  let location: Location;
  let router: Router;
  // let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
      declarations: [AppComponent],
      providers: [{ provide: 'environment', useValue: {} }],
    });
    // injecta una instancia de router
    router = TestBed.inject(Router);
    // injecta una instancia de router
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('navegate to "" redirects you to /login', (done) => {
    localStorage.clear()
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/login');
      // Llamada asyncronica que ejecuta el expect una vez terminado el router.navigate
      done();
    });
  });

  it('navegate to "login" redirects you to /login', (done) => {
    localStorage.clear()
    router.navigate(['/login']).then(() => {
      expect(location.path()).toBe('/login');
      done();
    });
  });

  it('navegate to "dashboard" redirects you to /dashboad', (done) => {
    localStorage.setItem('otec_token', 'testToken');
    router.navigate(['/dashboard']).then(() => {
      expect(location.path()).toBe('/dashboard');
      done(); //Llamada asyncronica que ejecuta el expect una vez terminado el router.navigate
    });
  });
});
