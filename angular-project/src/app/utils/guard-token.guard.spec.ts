import { TestBed } from '@angular/core/testing';

import { GuardTokenGuard } from './guard-token.guard';

describe('GuardTokenGuard', () => {
  let guard: GuardTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
