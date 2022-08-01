import { HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { PerfilesHttpService } from '../service/perfiles-http.service';
import { TokenInterceptor } from './token-interceptor';

describe('TOKEN Interceptor', () => {
  let httpMock: HttpTestingController;
  let service: PerfilesHttpService;
  let authFacade: AuthFacade;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        RouterTestingModule,
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
  });
  afterEach(() => {
    httpMock.verify();
  });

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

  // it('should call redirecction for token not authorized', () => {
  //   localStorage.setItem(
  //     'auth',
  //     JSON.stringify({
  //       sessionData: {
  //         token: '123456789',
  //       },
  //     })
  //   );

  //   service.getPerfilesUsuario(2).subscribe({
  //     error: err => console.log(err),
  //     next: res => console.log(res),
  //   });

  //   const httpReq = httpMock.expectOne(
  //     `${environment.api}/usuario/perfiles/get`
  //   );
  //   // expect(routerSpy.navigate).toHaveBeenCalledWith(['/login/auth']);
  // });
});
