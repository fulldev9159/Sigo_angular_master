import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProveedorHttpService } from './proveedor-http.service';

describe('ProveedorHttpService', () => {
  let service: ProveedorHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ProveedorHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
