import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DigimonListItem {
  id: number;
  name: string;
  href: string;
  image: string;
}

export interface DigimonApiResponse {
  content: DigimonListItem[];
  pageable: {
    currentPage: number;
    elementsOnPage: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface DigimonDetail {
  id: number;
  name: string;
  images: Array<{ href: string; transparent?: boolean }>;
  levels?: Array<{ id: number; level: string }>;
  types?: Array<{ id: number; type: string }>;
  attributes?: Array<{ id: number; attribute: string }>;
  fields?: Array<{ id: number; field: string; image: string }>;
  descriptions?: Array<{ origin: string; language: string; description: string }>;
  skills?: Array<{ id: number; skill: string; translation?: string; description: string }>;
}

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
