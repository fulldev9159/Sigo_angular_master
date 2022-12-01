import { TestBed } from '@angular/core/testing';

import { IngenieriaHttpService } from './ingenieria-http.service';

describe('IngenieriaHttpService', () => {
  let service: IngenieriaHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngenieriaHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
