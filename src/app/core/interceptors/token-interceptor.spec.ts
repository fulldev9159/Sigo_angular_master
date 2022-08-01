import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environment';
import { PerfilesHttpService } from '../service/perfiles-http.service';
import { TokenInterceptor } from './token-interceptor';

describe('TOKEN Interceptor', () => {
  let httpMock: HttpTestingController;
  let service: PerfilesHttpService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PerfilesHttpService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PerfilesHttpService);
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
});
