import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DbzRestService } from '../../services/dbz-rest';
import { DbzCharacterDetail } from '../../interfaces/dbz';
import { ImageModalComponent } from '../../components/image-modal/image-modal';

@Component({
  selector: 'app-dbz-detail',
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
  templateUrl: './dbz-detail.html',
  styleUrls: ['./dbz-detail.scss'],
})
export class DbzDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dbzService = inject(DbzRestService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  character = signal<DbzCharacterDetail | null>(null);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dbzService.getCharacterById(id).subscribe({
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

  openTransformationModal(imageUrl: string, name: string): void {
    this.dialog.open(ImageModalComponent, {
      data: { imageUrl, title: name },
      maxWidth: '90vw',
      maxHeight: '90vh',
    });
  }
}
