import { TestBed } from '@angular/core/testing';

import { ServiciosHttpService } from './servicios-http.service';

describe('ServiciosHttpService', () => {
  let service: ServiciosHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
