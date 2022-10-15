import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { InformeAvanceHttpService } from './informe-avance-http.service';

describe('InformeAvanceHttpService', () => {
  let service: InformeAvanceHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(InformeAvanceHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
