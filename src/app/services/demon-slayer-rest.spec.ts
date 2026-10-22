import { TestBed } from '@angular/core/testing';

import { DemonSlayerRest } from './demon-slayer-rest';

describe('DemonSlayerRest', () => {
  let service: DemonSlayerRest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemonSlayerRest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
