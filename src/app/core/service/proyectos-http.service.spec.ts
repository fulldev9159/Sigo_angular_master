import { TestBed } from '@angular/core/testing';

import { ProyectosHttpService } from './proyectos-http.service';

describe('ProyectosHttpService', () => {
  let service: ProyectosHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectosHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
