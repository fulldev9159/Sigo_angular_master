import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ActaHttpService } from './acta-http.service';

describe('ActaHttpService', () => {
  let service: ActaHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ActaHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
