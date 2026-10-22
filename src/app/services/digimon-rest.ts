import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface DigimonItem {
  name: string;
  img: string;
  level: string;
}

export interface DigimonWithId extends DigimonItem {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class DigimonRestService {
  private http = inject(HttpClient);
  private baseUrl = 'https://digimon-api.vercel.app/api/digimon';

  // Obtenemos todos y les asignamos un ID correlativo estable basado en su posición
  getAllDigimons(): Observable<DigimonWithId[]> {
    return this.http.get<DigimonItem[]>(this.baseUrl).pipe(
      map((items) =>
        items.map((item, index) => ({
          ...item,
          id: index + 1,
        })),
      ),
    );
  }

  getDigimonByName(name: string): Observable<DigimonItem | null> {
    return this.http
      .get<DigimonItem[]>(`${this.baseUrl}/name/${name}`)
      .pipe(map((results) => (results.length > 0 ? results[0] : null)));
  }
}
