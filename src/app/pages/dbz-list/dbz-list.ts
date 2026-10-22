import { Component, OnInit, inject, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DbzRestService } from '../../services/dbz-rest';
import { CharacterCardComponent } from '../../components/character-card/character-card';
import { BaseCharacter } from '../../interfaces/base-character';

@Component({
  selector: 'app-dbz-list',
  standalone: true,
  imports: [
    CharacterCardComponent,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './dbz-list.html',
  styleUrls: ['./dbz-list.scss'],
})
export class DbzListComponent implements OnInit {
  private dbzService = inject(DbzRestService);
  private snackBar = inject(MatSnackBar);

  characters = signal<BaseCharacter[]>([]);
  isLoading = signal<boolean>(true);

  totalElements = signal<number>(0);
  pageSize = signal<number>(12);
  pageIndex = signal<number>(0);

  ngOnInit(): void {
    this.loadDbzCharacters();
  }

  loadDbzCharacters(): void {
    this.isLoading.set(true);
    // MatPaginator cuenta desde 0, la API de DBZ espera páginas desde 1
    const apiPage = this.pageIndex() + 1;

    this.dbzService.getCharacters(apiPage, this.pageSize()).subscribe({
      next: (response) => {
        const mapped: BaseCharacter[] = response.items.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
        }));
        this.characters.set(mapped);
        this.totalElements.set(response.meta.totalItems);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.snackBar.open('Error al cargar personajes de Dragon Ball Z.', 'Cerrar', {
          duration: 4000,
        });
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadDbzCharacters();
  }
}
