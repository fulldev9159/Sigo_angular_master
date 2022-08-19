import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { tipoCubicacionMOCK200OK } from '@mocksOT';
import { of } from 'rxjs';

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
});
