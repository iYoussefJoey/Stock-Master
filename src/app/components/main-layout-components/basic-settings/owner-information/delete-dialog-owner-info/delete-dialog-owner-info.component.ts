import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { OwnerInformationComponent } from '../owner-information.component';

@Component({
  selector: 'app-delete-dialog-owner-info',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,],
  templateUrl: './delete-dialog-owner-info.component.html',
  styleUrl: './delete-dialog-owner-info.component.scss'
})
export class DeleteDialogOwnerInfoComponent {
  userName!: string;
  constructor(
    public _dialogRef: MatDialogRef<OwnerInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.userName = this.data['userName'];
    console.log(this.data);
  }
  onNoClick(): void {
    this._dialogRef.close(false);
  }
  submit() {
    this._dialogRef.close(true);
  }
}
