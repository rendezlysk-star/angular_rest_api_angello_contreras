import { Component, OnInit, inject, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DigimonRestService, DigimonWithId } from '../../services/digimon-rest';
import { CharacterCardComponent } from '../../components/character-card/character-card';
import { BaseCharacter } from '../../interfaces/base-character';

@Component({
  selector: 'app-digimon-list',
  standalone: true,
  imports: [
    CharacterCardComponent,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './digimon-list.html',
  styleUrls: ['./digimon-list.scss'],
})
export class DigimonListComponent implements OnInit {
  private digimonService = inject(DigimonRestService);
  private snackBar = inject(MatSnackBar);

  private allCharacters: DigimonWithId[] = [];
  paginatedCharacters = signal<BaseCharacter[]>([]);
  isLoading = signal<boolean>(true);

  totalElements = signal<number>(0);
  pageSize = signal<number>(20);
  pageIndex = signal<number>(0);

  ngOnInit(): void {
    this.loadDigimons();
  }

  loadDigimons(): void {
    this.isLoading.set(true);
    this.digimonService.getAllDigimons().subscribe({
      next: (data) => {
        this.allCharacters = data;
        this.totalElements.set(data.length);
        this.updatePageData();
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.snackBar.open('Error al conectar con la API de Digimon.', 'Cerrar', {
          duration: 4000,
        });
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.updatePageData();
  }

  private updatePageData(): void {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    const slice = this.allCharacters.slice(start, end);

    this.paginatedCharacters.set(
      slice.map((d) => ({
        id: d.name, // Usamos el nombre como identificador de ruta
        name: d.name,
        image: d.img,
      })),
    );
  }
}
