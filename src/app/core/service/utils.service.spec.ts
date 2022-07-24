import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('thereAreNullUndefEmptyStr should return true for one null item', () => {
    const obj: any = {
      a: null,
      b: 1,
    };
    expect(service.thereAreNullUndefEmptyStr(obj)).toBeTrue();
  });

  it('thereAreNullUndefEmptyStr should return true if all items are null', () => {
    const obj: any = {
      a: null,
      b: null,
    };
    expect(service.thereAreNullUndefEmptyStr(obj)).toBeTrue();
  });

  it('thereAreNullUndefEmptyStr should return true if all items are undefined', () => {
    const obj: any = {
      a: undefined,
      b: undefined,
    };
    expect(service.thereAreNullUndefEmptyStr(obj)).toBeTrue();
  });

  it('thereAreNullUndefEmptyStr should return true if all items one item is null other is undefined and other is empty', () => {
    const obj: any = {
      a: undefined,
      b: null,
      c: '',
    };
    expect(service.thereAreNullUndefEmptyStr(obj)).toBeTrue();
  });

  it('thereAreNullUndefEmptyStr should return false if all items exist and completed', () => {
    const obj: any = {
      a: 'asdas',
      b: 'asdasd',
      c: 1,
    };
    expect(service.thereAreNullUndefEmptyStr(obj)).toBeFalse();
  });
});
