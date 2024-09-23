import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { SupplierInfoComponent } from '../supplier-info.component';

@Component({
  selector: 'app-delete-dialog-supp-info',
  standalone: true,
  imports: [ MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule],
  templateUrl: './delete-dialog-supp-info.component.html',
  styleUrl: './delete-dialog-supp-info.component.scss'
})
export class DeleteDialogSuppInfoComponent {
  supplierName!: string;
  constructor(
    public _dialogRef: MatDialogRef<SupplierInfoComponent>,
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
