import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ReceivingManagementComponent } from '../receiving-management.component';

@Component({
  selector: 'app-delete-receiving-manage-diaglog',
  standalone: true,
  imports: [ MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule],
  templateUrl: './delete-receiving-manage-diaglog.component.html',
  styleUrl: './delete-receiving-manage-diaglog.component.scss'
})
export class DeleteReceivingManageDiaglogComponent {
  supplierName!: string;
  constructor(
    public _dialogRef: MatDialogRef<ReceivingManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.supplierName = this.data['supplierName'];
    console.log(this.data);
  }
  onNoClick(): void {
    this._dialogRef.close(false);
  }
  submit() {
    this._dialogRef.close(true);
  }
}
