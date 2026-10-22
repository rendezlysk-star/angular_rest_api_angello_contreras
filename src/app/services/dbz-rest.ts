import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DbzCharacterItem {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
}

export interface DbzApiResponse {
  items: DbzCharacterItem[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface DbzTransformation {
  id: number;
  name: string;
  image: string;
  ki: string;
}

export interface DbzOriginPlanet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
}

export interface DbzCharacterDetail extends DbzCharacterItem {
  originPlanet?: DbzOriginPlanet;
  transformations: DbzTransformation[];
}

@Injectable({
  providedIn: 'root',
})
export class DbzRestService {
  private http = inject(HttpClient);
  private baseUrl = 'https://dragonball-api.com/api/characters';

  getCharacters(page: number = 1, limit: number = 12): Observable<DbzApiResponse> {
    return this.http.get<DbzApiResponse>(`${this.baseUrl}?page=${page}&limit=${limit}`);
  }

  getCharacterById(id: string | number): Observable<DbzCharacterDetail> {
    return this.http.get<DbzCharacterDetail>(`${this.baseUrl}/${id}`);
  }
}
