import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface NamedEntity {
  id?: number;
  name: string;
}

export interface DemonSlayerCharacter {
  id: number;
  name: string;
  img?: string;
  image?: string;
  race?: string;
  gender?: string;
  age?: number | string;
  description?: string;
  affiliation?: string | NamedEntity;
  combat_style?: string | NamedEntity | NamedEntity[];
  quote?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DemonSlayerRestService {
  private http = inject(HttpClient);
  private baseUrl = 'https://www.demonslayer-api.com/api/v1/characters';

  getCharacters(
    page: number = 1,
    limit: number = 10,
  ): Observable<{ items: DemonSlayerCharacter[]; total: number }> {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&limit=${limit}`).pipe(
      map((response) => {
        const items: DemonSlayerCharacter[] =
          response.content || (Array.isArray(response) ? response : []);
        const total: number = response.pagination?.totalElements || 45;
        return { items, total };
      }),
    );
  }

  getCharacterById(id: string | number): Observable<DemonSlayerCharacter | null> {
    return this.http.get<any>(`${this.baseUrl}?id=${id}`).pipe(
      map((response) => {
        let char: DemonSlayerCharacter | null = null;
        if (response?.content && Array.isArray(response.content)) {
          char = response.content[0] || null;
        } else if (Array.isArray(response)) {
          char = response.length > 0 ? response[0] : null;
        } else {
          char = response || null;
        }
        return char;
      }),
    );
  }
}
