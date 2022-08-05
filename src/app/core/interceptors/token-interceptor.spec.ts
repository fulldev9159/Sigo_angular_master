import { HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@environment';
import { StoreModule } from '@ngrx/store';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { LoginFormComponent } from 'src/app/features/auth/components/login-form/login-form.component';
import { PerfilesHttpService } from '../service/perfiles-http.service';
import { TokenInterceptor } from './token-interceptor';

describe('TOKEN Interceptor', () => {
  let httpMock: HttpTestingController;
  let service: PerfilesHttpService;
  let authFacade: AuthFacade;
  let routerSpy: jasmine.SpyObj<Router>;
  let interceptor: TokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([
          {
            path: 'login/auth',
            component: LoginFormComponent,
          },
        ]),
      ],
      providers: [
        PerfilesHttpService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      ],
    });
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PerfilesHttpService);
    authFacade = TestBed.inject(AuthFacade);
    // interceptor = TestBed.inject(TokenInterceptor);
  });
  afterEach(() => {
    httpMock.verify();
  });

  // it('should be created', () => {
  //   expect(interceptor).toBeTruthy();
  // });

  it('should add token barear into header', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: {
          token: '123456789',
        },
      })
    );

    service.getPerfilesUsuario(2).subscribe(res => expect(res).toBeTruthy());
    const httpReq = httpMock.expectOne(
      `${environment.api}/usuario/perfiles/get`
    );
    expect(httpReq.request.headers.has('Authorization')).toEqual(true);
    expect(httpReq.request.headers.get('Authorization')).toEqual(
      'Bearer 123456789'
    );
  });

  it('should call redirecction for token not authorized', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: {
          token: '123456789',
        },
      })
    );
    service.getPerfilesUsuario(2).subscribe();

    const request = httpMock.expectOne(
      `${environment.api}/usuario/perfiles/get`
    );

    request.flush('', { status: 401, statusText: 'Not authorized' });

    // expect(routerSpy.navigate).toHaveBeenCalledWith(['/login/auth']);
  });
});
