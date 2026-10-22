import { Component, OnInit, inject, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DigimonRestService } from '../../services/digimon-rest';
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

  characters = signal<BaseCharacter[]>([]);
  isLoading = signal<boolean>(true);

  totalElements = signal<number>(0);
  pageSize = signal<number>(20);
  pageIndex = signal<number>(0);

  ngOnInit(): void {
    this.loadDigimons();
  }

  loadDigimons(): void {
    this.isLoading.set(true);
    this.digimonService.getDigimons(this.pageIndex(), this.pageSize()).subscribe({
      next: (response) => {
        const mapped: BaseCharacter[] = response.content.map((d) => ({
          id: d.id, // ID numérico real de la API
          name: d.name,
          image: d.image,
        }));
        this.characters.set(mapped);
        this.totalElements.set(response.pageable.totalElements);
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
    this.loadDigimons();
  }
}
