import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DigimonRestService, DigimonItem } from '../../services/digimon-rest';

@Component({
  selector: 'app-digimon-detail',
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
  templateUrl: './digimon-detail.html',
  styleUrls: ['./digimon-detail.scss'],
})
export class DigimonDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private digimonService = inject(DigimonRestService);
  private snackBar = inject(MatSnackBar);

  digimon = signal<DigimonItem | null>(null);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.digimonService.getDigimonByName(id).subscribe({
        next: (data) => {
          this.digimon.set(data);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          this.snackBar.open('No se pudo cargar el detalle del Digimon.', 'Cerrar', {
            duration: 4000,
          });
        },
      });
    }
  }
}
