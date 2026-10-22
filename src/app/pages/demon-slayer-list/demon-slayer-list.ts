import { Component, OnInit, inject, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DemonSlayerRestService } from '../../services/demon-slayer-rest';
import { CharacterCardComponent } from '../../components/character-card/character-card';
import { BaseCharacter } from '../../interfaces/base-character';

@Component({
  selector: 'app-demon-slayer-list',
  standalone: true,
  imports: [
    CharacterCardComponent,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './demon-slayer-list.html',
  styleUrls: ['./demon-slayer-list.scss'],
})
export class DemonSlayerListComponent implements OnInit {
  private dsService = inject(DemonSlayerRestService);
  private snackBar = inject(MatSnackBar);

  characters = signal<BaseCharacter[]>([]);
  isLoading = signal<boolean>(true);

  totalElements = signal<number>(45);
  pageSize = signal<number>(10);
  pageIndex = signal<number>(0);

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.isLoading.set(true);
    const apiPage = this.pageIndex() + 1;

    this.dsService.getCharacters(apiPage, this.pageSize()).subscribe({
      next: (res) => {
        const mapped: BaseCharacter[] = res.items.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.img || item.image || '',
        }));
        this.characters.set(mapped);
        this.totalElements.set(res.total);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.snackBar.open('Error al conectar con la API de Demon Slayer.', 'Cerrar', {
          duration: 4000,
        });
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadCharacters();
  }
}
