import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CommodityManagementComponent } from '../commodity-management.component';

@Component({
  selector: 'app-delete-comod-managment-dialog',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,],
  templateUrl: './delete-comod-managment-dialog.component.html',
  styleUrl: './delete-comod-managment-dialog.component.scss'
})
export class DeleteComodManagmentDialogComponent {
  commodityName!: string;
  constructor(
    public _dialogRef: MatDialogRef<CommodityManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.commodityName = this.data['userName'];
    console.log(this.data);
  }
  onNoClick(): void {
    this._dialogRef.close(false);
  }
  submit() {
    this._dialogRef.close(true);
  }

}
