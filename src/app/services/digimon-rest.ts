import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DigimonDetail, DigimonApiResponse } from '../interfaces/digimon';

@Injectable({
  providedIn: 'root',
})
export class DigimonRestService {
  private http = inject(HttpClient);
  private baseUrl = 'https://digi-api.com/api/v1/digimon';

  getDigimons(page: number = 0, pageSize: number = 20): Observable<DigimonApiResponse> {
    return this.http.get<DigimonApiResponse>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
  }

  getDigimonById(id: string | number): Observable<DigimonDetail> {
    return this.http.get<DigimonDetail>(`${this.baseUrl}/${id}`);
  }
}
