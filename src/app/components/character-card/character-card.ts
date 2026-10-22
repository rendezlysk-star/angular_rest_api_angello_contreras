import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { ImageModalComponent } from '../image-modal/image-modal';
import { BaseCharacter } from '../../interfaces/base-character';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [MatCardModule, MatDialogModule, MatRippleModule],
  templateUrl: './character-card.html',
  styleUrls: ['./character-card.scss'],
})
export class CharacterCardComponent {
  @Input({ required: true }) character!: BaseCharacter;
  @Input({ required: true }) detailRoutePrefix!: string;
  @Input() themeClass: string = '';

  private dialog = inject(MatDialog);
  private router = inject(Router);

  openImageModal(event: MouseEvent): void {
    event.stopPropagation();
    this.dialog.open(ImageModalComponent, {
      data: {
        imageUrl: this.character.image,
        title: this.character.name,
      },
      maxWidth: '90vw',
      maxHeight: '90vh',
    });
  }

  navigateToDetail(): void {
    this.router.navigate([this.detailRoutePrefix, this.character.id]);
  }
}
