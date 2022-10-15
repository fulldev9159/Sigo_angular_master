import { TestBed } from '@angular/core/testing';

import { PerfilesHttpService } from './perfiles-http.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import {
  getPermisosPerfileUsuarioMOCK200OK,
  PerfilUserMock200OK,
} from '@mocksOT';
import { of } from 'rxjs';

describe('PerfilesHttpService', () => {
  let service: PerfilesHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new PerfilesHttpService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getPerfilesUsuario and return and getPerfilesUsuario Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(PerfilUserMock200OK));
    service.getPerfilesUsuario(1).subscribe({
      next: response => {
        expect(response).toEqual(PerfilUserMock200OK);
        done();
      },
      error: done.fail,
    });
  });

  it('should call getPermisosPerfilUsuario and return and permisos Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(getPermisosPerfileUsuarioMOCK200OK));
    service.getPermisosPerfilUsuario().subscribe({
      next: response => {
        expect(response).toEqual(getPermisosPerfileUsuarioMOCK200OK);
        done();
      },
      error: done.fail,
    });
  });
});
