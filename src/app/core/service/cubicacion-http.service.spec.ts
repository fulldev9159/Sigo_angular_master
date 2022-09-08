import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  detalleCubicacionMOCK200Ok,
  eliminarCubicacionMOCK200ok,
  listaCubicacionesMOCK200ok,
  saveCubicacionMOCK200ok,
  tipoCubicacionMOCK200OK,
} from '@mocksOT';
import { of } from 'rxjs';
import { RequestCreateCubicacion } from '../model/cubicacion';

import { CubicacionHttpService } from './cubicacion-http.service';

describe('CubicacionHttpService', () => {
  let service: CubicacionHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new CubicacionHttpService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTipoCubicacion and return and TipoCubicacion Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(tipoCubicacionMOCK200OK));
    service.getTipoCubicacion().subscribe({
      next: response => {
        expect(response).toEqual(tipoCubicacionMOCK200OK);
        done();
      },
      error: done.fail,
    });
  });

  it('should call saveCubicacion and return ok response', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(saveCubicacionMOCK200ok));
    let request: RequestCreateCubicacion = {
      cubicacion_datos: {
        nombre: 'string',
        tipo_cubicacion_id: 1,
        contrato_id: 1,
        agencia_id: 1,
        proveedor_id: 1,
        codigo_acuerdo: 'string;',
        cmarco_has_proveedor_id: 1,
        usuario_creador_id: 1,
        direccion_desde: 'string;',
        altura_desde: 'string;',
        direccion_hasta: 'string;',
        altura_hasta: 'string;',
        descripcion: 'string;',
      },
      cubicacion_detalle: {
        nuevo: [],
      },
    };
    service.saveCubicacion(request).subscribe({
      next: response => {
        expect(response).toEqual(saveCubicacionMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });

  it('should call getCubicaciones and return and  Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(listaCubicacionesMOCK200ok));
    service.getCubicaciones().subscribe({
      next: response => {
        expect(response).toEqual(listaCubicacionesMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });

  it('should call getDetalleCubicacion and return  Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(detalleCubicacionMOCK200Ok));
    service.getDetalleCubicacion(1).subscribe({
      next: response => {
        expect(response).toEqual(detalleCubicacionMOCK200Ok);
        done();
      },
      error: done.fail,
    });
  });

  it('should call eliminarCubicacion and return  Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(eliminarCubicacionMOCK200ok));
    service.eliminarCubicacion(1).subscribe({
      next: response => {
        expect(response).toEqual(eliminarCubicacionMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });
});
