import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  CentralesMOCK200ok,
  ComunasMOCK200ok,
  SolicitadoPorMOCK200ok,
} from 'src/mocks/ot';

import { OtHttpService } from './ot-http.service';

describe('OtHttpService', () => {
  let service: OtHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(OtHttpService);
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
});
