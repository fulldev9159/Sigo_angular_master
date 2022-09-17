import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TipoDeNumeroInternoMOCK200ok } from '@mocksOT';
import { of } from 'rxjs';

import { NumeroInternoHttpService } from './numero-interno-http.service';

describe('NumeroInternoHttpService', () => {
  let service: NumeroInternoHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new NumeroInternoHttpService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTipoDeNumeroInterno and return  Data', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(TipoDeNumeroInternoMOCK200ok));
    service.getTipoDeNumeroInterno().subscribe({
      next: response => {
        expect(response).toEqual(TipoDeNumeroInternoMOCK200ok);
        done();
      },
      error: done.fail,
    });
  });
});
