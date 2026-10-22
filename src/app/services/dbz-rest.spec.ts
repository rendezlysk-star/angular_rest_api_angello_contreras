import { TestBed } from '@angular/core/testing';

import { DbzRest } from './dbz-rest';

describe('DbzRest', () => {
  let service: DbzRest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbzRest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
