import { TestBed } from '@angular/core/testing';

import { AuthHttpService } from './auth-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { LoginMock200OK, LoginRefreshMock200OK } from '@mocksOT';
import { of } from 'rxjs';

describe('AuthHttpService', () => {
  let service: AuthHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AuthHttpService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login and return and login Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(LoginMock200OK));
    service.logIn('mgestor1', 'asdasd').subscribe({
      next: response => {
        expect(response).toEqual(LoginMock200OK);
        done();
      },
      error: done.fail,
    });
  });

  // it('should call refresh login and return token', (done: DoneFn) => {
  //   httpClientSpy.post.and.returnValue(of(LoginRefreshMock200OK));
  //   service.logIn('mgestor1', 'asdasd').subscribe({
  //     next: response => {
  //       expect(response).toEqual(LoginMock200OK);
  //       done();
  //     },
  //     error: done.fail,
  //   });
  // });
});
