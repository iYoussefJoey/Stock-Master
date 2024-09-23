import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UserRoleComponent } from '../user-role.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-role-delete-dia',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,],
  templateUrl: './user-role-delete-dia.component.html',
  styleUrl: './user-role-delete-dia.component.scss'
})
export class UserRoleDeleteDiaComponent {
  userRole!: string;
  constructor(
    public _dialogRef: MatDialogRef<UserRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.userRole = this.data['userRole'];
    console.log(this.data);
  }
  onNoClick(): void {
    this._dialogRef.close(false);
  }
  submit() {
    this._dialogRef.close(true);
  }
}
