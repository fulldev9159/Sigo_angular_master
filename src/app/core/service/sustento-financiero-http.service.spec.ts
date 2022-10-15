import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SustentoFinancieroHttpService } from './sustento-financiero-http.service';

describe('SustentoFinanciertoHttpService', () => {
  let service: SustentoFinancieroHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(SustentoFinancieroHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
