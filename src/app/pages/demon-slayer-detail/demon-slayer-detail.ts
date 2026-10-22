import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DemonSlayerRestService } from '../../services/demon-slayer-rest';
import { DemonSlayerCharacter } from '../../interfaces/demon-slayer';

@Component({
  selector: 'app-demon-slayer-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './demon-slayer-detail.html',
  styleUrls: ['./demon-slayer-detail.scss'],
})
export class DemonSlayerDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dsService = inject(DemonSlayerRestService);
  private snackBar = inject(MatSnackBar);

  character = signal<DemonSlayerCharacter | null>(null);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dsService.getCharacterById(id).subscribe({
        next: (data) => {
          this.character.set(data);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          this.snackBar.open('No se pudo cargar el detalle del personaje.', 'Cerrar', {
            duration: 4000,
          });
        },
      });
    }
  }

  getImageUrl(): string {
    const char = this.character();
    if (!char) return '';
    return (
      char.img ||
      char.image ||
      `https://www.demonslayer-api.com/api/v1/characters/images/${char.id}.webp`
    );
  }

  getCombatStyles(): string[] {
    const cs = this.character()?.combat_style as any;
    if (!cs) return [];
    if (Array.isArray(cs)) {
      return cs
        .map((item) => (typeof item === 'object' ? item.name || item.title || '' : String(item)))
        .filter(Boolean);
    }
    if (typeof cs === 'object') {
      return [cs.name || cs.title || ''].filter(Boolean);
    }
    return [String(cs)];
  }

  getAffiliation(): string {
    const aff = this.character()?.affiliation as any;
    if (!aff) return '';
    if (typeof aff === 'object') {
      return aff.name || aff.title || 'Cuerpo de Exterminio';
    }
    return String(aff);
  }
}
