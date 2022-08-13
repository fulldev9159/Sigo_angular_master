import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ContratoHttpService } from './contrato-http.service';

describe('ContratoHttpService', () => {
  let service: ContratoHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ContratoHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
