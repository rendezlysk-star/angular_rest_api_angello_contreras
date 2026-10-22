import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DbzApiResponse, DbzCharacterDetail } from '../interfaces/dbz';

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
