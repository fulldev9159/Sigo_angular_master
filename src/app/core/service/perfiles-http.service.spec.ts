import { TestBed } from '@angular/core/testing';

import { PerfilesHttpService } from './perfiles-http.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { PerfilUserMock200OK } from '@mocksOT';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthHttpService } from './auth-http.service';

describe('PerfilesHttpService', () => {
  let service: PerfilesHttpService;
  let authService: AuthHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = TestBed.inject(PerfilesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should call getPerfilesUsuario and return and perfiles Data', (done: DoneFn) => {
  //   httpClientSpy.post.and.returnValue(of(PerfilUserMock200OK));
  //   authService.logIn('mgestor1', 'asdadas').subscribe({
  //     next: response => {
  //       localStorage.setItem(
  //         'auth',
  //         JSON.stringify({
  //           sessionData: {
  //             token: response.data.token,
  //           },
  //         })
  //       );

  //       done();
  //     },
  //     error: done.fail,
  //   });
  //   service.getPerfilesUsuario(2).subscribe({
  //     next: response => {
  //       expect(response).toEqual(PerfilUserMock200OK);
  //       done();
  //     },
  //     error: done.fail,
  //   });
  // });
});
