import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { LoginMock } from '@mocksOT';
import { of } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new LoginService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login and return and login Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(LoginMock));
    service.logIn('mgestor1', 'asdasd').subscribe({
      next: response => {
        expect(response).toEqual(LoginMock);
        done();
      },
      error: done.fail,
    });
  });
});
