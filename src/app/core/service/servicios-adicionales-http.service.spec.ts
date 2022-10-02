import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ServiciosAdicionalesHttpService } from './servicios-adicionales-http.service';

describe('ServiciosAdicionalesHttpService', () => {
  let service: ServiciosAdicionalesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ServiciosAdicionalesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
