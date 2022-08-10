import { TestBed } from '@angular/core/testing';

import { CubicacionHttpService } from './cubicacion-http.service';

describe('CubicacionHttpService', () => {
  let service: CubicacionHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CubicacionHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
