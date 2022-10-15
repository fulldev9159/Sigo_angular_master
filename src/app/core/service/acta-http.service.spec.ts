import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  aceptarRechazarAdicionalesMOCK200ok,
  GetDetalleServicio4ActaMOCK200ok,
  GetDetalleUO4ActaMOCK200ok,
  getLastActaMOCK200ok,
  getTiposPagoActaMOCK200ok,
  informarTrabajosFinalizadosMOCK200ok,
  validarActaMOCK200ok,
} from '@mocksOT';
import { of } from 'rxjs';

import { ActaHttpService } from './acta-http.service';

describe('ActaHttpService', () => {
  let service: ActaHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new ActaHttpService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getServicios4Acta and return and getServicios4Acta Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(GetDetalleServicio4ActaMOCK200ok));
    service.getServicios4Acta(1).subscribe({
      next: response => {
        expect(response).toEqual(GetDetalleServicio4ActaMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });

  it('should call getUOs4Acta and return and getUOs4Acta Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(GetDetalleUO4ActaMOCK200ok));
    service.getUOs4Acta(1).subscribe({
      next: response => {
        expect(response).toEqual(GetDetalleUO4ActaMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });

  it('should call informarTrabajosFinalizados and return and informarTrabajosFinalizados Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(
      of(informarTrabajosFinalizadosMOCK200ok)
    );
    service.informarTrabajosFinalizados(1, '').subscribe({
      next: response => {
        expect(response).toEqual(informarTrabajosFinalizadosMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });

  it('should call getActaTiposPago and return and getActaTiposPago Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(getTiposPagoActaMOCK200ok));
    service.getActaTiposPago().subscribe({
      next: response => {
        expect(response).toEqual(getTiposPagoActaMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });

  it('should call validarActa and return and validarActa Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(validarActaMOCK200ok));
    service
      .validarActa({
        ot_id: 1,
        tipo_pago: 'TOTAL',
        observacion: '',
        estado: 'APROBADO',
        detalle: {
          servicio: [],
          unidad_obra: [],
        },
      })
      .subscribe({
        next: response => {
          expect(response).toEqual(validarActaMOCK200ok);
          done();
        },
        error: done.fail,
      });
  });

  it('should call aceptarRechazarAdicionales and return and aceptarRechazarAdicionales Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(aceptarRechazarAdicionalesMOCK200ok));
    service
      .aceptarRechazarAdicionales({
        ot_id: 1,
        adicionales_aceptados: [],
        adicionales_rechazados: [],
      })
      .subscribe({
        next: response => {
          expect(response).toEqual(aceptarRechazarAdicionalesMOCK200ok);
          done();
        },
        error: done.fail,
      });
  });

  it('should call getLastActa and return and getLastActa Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(getLastActaMOCK200ok));
    service.getLastActa(1).subscribe({
      next: response => {
        expect(response).toEqual(getLastActaMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });
});
