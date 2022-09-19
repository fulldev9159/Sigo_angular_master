import { TestBed } from '@angular/core/testing';

import { FlujoOtHttpService } from './flujo-ot-http.service';

describe('FlujoOtHttpService', () => {
  let service: FlujoOtHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlujoOtHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
