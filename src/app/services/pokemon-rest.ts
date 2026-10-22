import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    other?: {
      'official-artwork'?: {
        front_default: string;
      };
      home?: {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonRestService {
  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemonList(offset: number = 0, limit: number = 20): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemonById(idOrName: string | number): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.baseUrl}/${idOrName}`);
  }
}
