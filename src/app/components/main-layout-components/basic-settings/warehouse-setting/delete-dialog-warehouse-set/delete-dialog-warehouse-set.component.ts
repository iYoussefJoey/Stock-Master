import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { WarehouseSettingComponent } from '../warehouse-setting.component';

@Component({
  selector: 'app-delete-dialog-warehouse-set',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,],
  templateUrl: './delete-dialog-warehouse-set.component.html',
  styleUrl: './delete-dialog-warehouse-set.component.scss'
})
export class DeleteDialogWarehouseSetComponent {
  userName!: string;
  constructor(
    public _dialogRef: MatDialogRef<WarehouseSettingComponent>,
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
