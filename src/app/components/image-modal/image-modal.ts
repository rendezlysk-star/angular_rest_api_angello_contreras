import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageModalData } from '../../interfaces/image-modal';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './image-modal.html',
  styleUrls: ['./image-modal.scss'],
})
export class ImageModalComponent {
  dialogRef = inject(MatDialogRef<ImageModalComponent>);
  data: ImageModalData = inject(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }
}
