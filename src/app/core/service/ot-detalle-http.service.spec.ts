import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OtDetalleHttpService } from './ot-detalle-http.service';

describe('OtDetalleHttpService', () => {
  let service: OtDetalleHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(OtDetalleHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
