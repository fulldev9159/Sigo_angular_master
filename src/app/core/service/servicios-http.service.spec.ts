import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  DetallesServicioTipoAgenciaContratoProveedorMOCK200OK,
  DetallesUnidadObraServicioMOCK200OK,
  ServiciosAgenciaContratoProveedorMOCK200OK,
  UnidadObraServicioMOCK200OK,
} from '@mocksOT';
import { of } from 'rxjs';

import { ServiciosHttpService } from './servicios-http.service';

describe('ServiciosHttpService', () => {
  let service: ServiciosHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new ServiciosHttpService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getServiciosAgenciaContratoProveedor and return and getServiciosAgenciaContratoProveedor Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(
      of(ServiciosAgenciaContratoProveedorMOCK200OK)
    );
    service
      .getServiciosAgenciaContratoProveedor({
        agencia_id: 1,
        cmarco_has_prov_id: 2,
        tipo_servicio_id: 2,
        actividad_id: 1,
      })
      .subscribe({
        next: response => {
          expect(response).toEqual(ServiciosAgenciaContratoProveedorMOCK200OK);
          done();
        },
        error: done.fail,
      });
  });

  it('should call getUnidadesObraServicio and return and getUnidadesObraServicio Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(UnidadObraServicioMOCK200OK));
    service
      .getUnidadesObraServicio({
        servicio_cod: 'asdas',
        actividad_id: 1,
      })
      .subscribe({
        next: response => {
          expect(response).toEqual(UnidadObraServicioMOCK200OK);
          done();
        },
        error: done.fail,
      });
  });

  it('should call getDetallesServiciosTipoAgenciaContratoProveedor and return and getDetallesServiciosTipoAgenciaContratoProveedor Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(
      of(DetallesServicioTipoAgenciaContratoProveedorMOCK200OK)
    );
    service
      .getDetallesServiciosTipoAgenciaContratoProveedor({
        agencia_id: 1,
        cmarco_has_proveedor_id: 1,
        servicio_id: 1,
        tipo_servicio_id: 1,
        actividad_id: 1,
      })
      .subscribe({
        next: response => {
          expect(response).toEqual(
            DetallesServicioTipoAgenciaContratoProveedorMOCK200OK
          );
          done();
        },
        error: done.fail,
      });
  });

  it('should call getDetallesServiciosTipoAgenciaContratoProveedor and return and getDetallesServiciosTipoAgenciaContratoProveedor Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(
      of(DetallesServicioTipoAgenciaContratoProveedorMOCK200OK)
    );
    service
      .getDetallesServiciosTipoAgenciaContratoProveedor({
        agencia_id: 1,
        cmarco_has_proveedor_id: 1,
        servicio_id: 1,
        tipo_servicio_id: 1,
        actividad_id: 1,
      })
      .subscribe({
        next: response => {
          expect(response).toEqual(
            DetallesServicioTipoAgenciaContratoProveedorMOCK200OK
          );
          done();
        },
        error: done.fail,
      });
  });

  it('should call getDetallesUnidadObraServicio and return and getDetallesUnidadObraServicio Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(DetallesUnidadObraServicioMOCK200OK));
    service.getDetallesUnidadObraServicio('asd').subscribe({
      next: response => {
        expect(response).toEqual(DetallesUnidadObraServicioMOCK200OK);
        done();
      },
      error: done.fail,
    });
  });
});
