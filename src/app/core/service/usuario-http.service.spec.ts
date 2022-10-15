import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ContratosUsuarioMOCK200OK } from '@mocksOT';
import { of } from 'rxjs';

import { UsuarioHttpService } from './usuario-http.service';

describe('UsuarioHttpService', () => {
  let service: UsuarioHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new UsuarioHttpService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getContratosUsuario and return and getContratosUsuario Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(ContratosUsuarioMOCK200OK));
    service.getContratosUsuario(1).subscribe({
      next: response => {
        expect(response).toEqual(ContratosUsuarioMOCK200OK);
        done();
      },
      error: done.fail,
    });
  });
});
