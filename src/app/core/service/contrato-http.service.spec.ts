import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  getActividadesContratoProveedorMOCK200ok,
  getAgenciasContratoMOCK200OK,
  getTipoServiciosContratoMOCK200ok,
} from '@mocksOT';
import { of } from 'rxjs';

import { ContratoHttpService } from './contrato-http.service';

describe('ContratoHttpService', () => {
  let service: ContratoHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new ContratoHttpService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAgenciasContrato and return and AgenciaContrato Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(getAgenciasContratoMOCK200OK));
    service.getAgenciasContrato(1).subscribe({
      next: response => {
        expect(response).toEqual(getAgenciasContratoMOCK200OK);
        done();
      },
      error: done.fail,
    });
  });

  it('should call getActividadesContratoProveedor and return and ActividadContratoProveedor Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(
      of(getActividadesContratoProveedorMOCK200ok)
    );
    service.getActividadesContratoProveedor(1).subscribe({
      next: response => {
        expect(response).toEqual(getActividadesContratoProveedorMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });

  it('should call getTipoServiciosContrato and return and getTipoServiciosContrato Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(getTipoServiciosContratoMOCK200ok));
    service.getTipoServiciosContrato(1, 1).subscribe({
      next: response => {
        expect(response).toEqual(getTipoServiciosContratoMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });
});
