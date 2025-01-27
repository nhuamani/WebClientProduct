import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {

  readonly dialoRef = inject(MatDialogRef<ConfirmationDialogComponent>);

  onCancel(): void {
    this.dialoRef.close(false);
  }

  onConfirm(): void {
    this.dialoRef.close(true);
  }
}
