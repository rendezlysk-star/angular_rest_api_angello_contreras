import { TestBed } from '@angular/core/testing';

import { DigimonRest } from './digimon-rest';

describe('DigimonRest', () => {
  let service: DigimonRest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigimonRest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
