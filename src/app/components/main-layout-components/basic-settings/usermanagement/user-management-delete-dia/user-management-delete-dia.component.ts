import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UsermanagementComponent } from '../usermanagement.component';

@Component({
  selector: 'app-user-management-delete-dia',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,],
  templateUrl: './user-management-delete-dia.component.html',
  styleUrl: './user-management-delete-dia.component.scss'
})
export class UserManagementDeleteDiaComponent {
  userName!: string;
  constructor(
    public _dialogRef: MatDialogRef<UsermanagementComponent>,
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
