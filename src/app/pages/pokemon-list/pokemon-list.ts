import { Component, OnInit, inject, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PokemonRestService } from '../../services/pokemon-rest';
import { CharacterCardComponent } from '../../components/character-card/character-card';
import { BaseCharacter } from '../../interfaces/base-character';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CharacterCardComponent,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './pokemon-list.html',
  styleUrls: ['./pokemon-list.scss'],
})
export class PokemonListComponent implements OnInit {
  private pokemonService = inject(PokemonRestService);
  private snackBar = inject(MatSnackBar);

  characters = signal<BaseCharacter[]>([]);
  isLoading = signal<boolean>(true);

  totalElements = signal<number>(0);
  pageSize = signal<number>(20);
  pageIndex = signal<number>(0);

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.isLoading.set(true);
    const offset = this.pageIndex() * this.pageSize();

    this.pokemonService.getPokemonList(offset, this.pageSize()).subscribe({
      next: (response) => {
        const mapped: BaseCharacter[] = response.results.map((item) => {
          // Extraemos el ID numérico del formato de URL: https://pokeapi.co/api/v2/pokemon/25/
          const parts = item.url.split('/').filter(Boolean);
          const id = parts[parts.length - 1];
          const artworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

          return {
            id: Number(id),
            name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
            image: artworkUrl,
          };
        });

        this.characters.set(mapped);
        this.totalElements.set(response.count);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.snackBar.open('Error al conectar con PokéAPI.', 'Cerrar', { duration: 4000 });
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadPokemons();
  }
}
