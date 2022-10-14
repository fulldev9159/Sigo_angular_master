import { TestBed } from '@angular/core/testing';

import { LibroObrasHttpService } from './libro-obras-http.service';

describe('LibroObrasHttpService', () => {
  let service: LibroObrasHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibroObrasHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
