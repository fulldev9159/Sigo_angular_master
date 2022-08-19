import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { getProveedoresAgenciaContratoMOCK200OK } from '@mocksOT';
import { of } from 'rxjs';

import { ProveedorHttpService } from './proveedor-http.service';

describe('ProveedorHttpService', () => {
  let service: ProveedorHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new ProveedorHttpService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getProveedoresAgenciaContrato and return and ProveedorAgenciaContrato Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(
      of(getProveedoresAgenciaContratoMOCK200OK)
    );
    service.getProveedoresAgenciaContrato(1, 1).subscribe({
      next: response => {
        expect(response).toEqual(getProveedoresAgenciaContratoMOCK200OK);
        done();
      },
      error: done.fail,
    });
  });
});
