import { TestBed } from '@angular/core/testing';

import { PokemonRest } from './pokemon-rest';

describe('PokemonRest', () => {
  let service: PokemonRest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonRest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
