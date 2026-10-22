import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PokemonRestService, PokemonDetail } from '../../services/pokemon-rest';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './pokemon-detail.html',
  styleUrls: ['./pokemon-detail.scss'],
})
export class PokemonDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonRestService);
  private snackBar = inject(MatSnackBar);

  pokemon = signal<PokemonDetail | null>(null);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemonById(id).subscribe({
        next: (data) => {
          this.pokemon.set(data);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          this.snackBar.open('No se pudo cargar el detalle del Pokémon.', 'Cerrar', {
            duration: 4000,
          });
        },
      });
    }
  }

  getImageUrl(): string {
    const p = this.pokemon();
    if (!p) return '';
    return (
      p.sprites.other?.['official-artwork']?.front_default ||
      p.sprites.other?.home?.front_default ||
      p.sprites.front_default ||
      ''
    );
  }

  getHeightInMeters(): string {
    const h = this.pokemon()?.height;
    return h ? `${(h / 10).toFixed(1)} m` : 'N/A';
  }

  getWeightInKg(): string {
    const w = this.pokemon()?.weight;
    return w ? `${(w / 10).toFixed(1)} kg` : 'N/A';
  }
}
