import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  AreaNegocioMOCK200ok,
  CentralesMOCK200ok,
  ComunasMOCK200ok,
  PlanProyectoMOCK200ok,
  SolicitadoPorMOCK200ok,
  TipoDeNumeroInternoMOCK200ok,
  TipoDeTrabajoMOCK200ok,
  TipoRedMOCK200ok,
} from 'src/mocks/ot';

import { OtHttpService } from './ot-http.service';

describe('OtHttpService', () => {
  let service: OtHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    // service = TestBed.inject(OtHttpService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new OtHttpService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getOficinaCentral and return  Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(CentralesMOCK200ok));
    service.getOficinaCentral(1).subscribe({
      next: response => {
        expect(response).toEqual(CentralesMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });

  it('should call getSolicitadoPor and return  Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(SolicitadoPorMOCK200ok));
    service.getSolicitadoPor().subscribe({
      next: response => {
        expect(response).toEqual(SolicitadoPorMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });

  it('should call getComunasFromCub and return  Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(ComunasMOCK200ok));
    service.getComunasFromCub(1).subscribe({
      next: response => {
        expect(response).toEqual(ComunasMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });

  it('should call getTipoDeRed and return  Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(TipoRedMOCK200ok));
    service.getTipoDeRed().subscribe({
      next: response => {
        expect(response).toEqual(TipoRedMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });

  it('should call getTipoDeTrabajoFromCub and return  Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(TipoDeTrabajoMOCK200ok));
    service.getTipoDeTrabajoFromCub(1).subscribe({
      next: response => {
        expect(response).toEqual(TipoDeTrabajoMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });

  it('should call getAreaDeNegocio and return  Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(AreaNegocioMOCK200ok));
    service.getAreaDeNegocio().subscribe({
      next: response => {
        expect(response).toEqual(AreaNegocioMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });

  it('should call getPlanDeProyecto and return  Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(PlanProyectoMOCK200ok));
    service.getPlanDeProyecto().subscribe({
      next: response => {
        expect(response).toEqual(PlanProyectoMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });
});
