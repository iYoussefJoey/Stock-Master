import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MiniforminputComponent } from '../../../shared/miniforminput/miniforminput.component';

@Component({
  selector: 'app-user-role-edit-dia',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MiniforminputComponent,
  ],
  templateUrl: './user-role-edit-dia.component.html',
  styleUrl: './user-role-edit-dia.component.scss',
})
export class UserRoleEditDiaComponent {
  userData!: FormGroup | any;

  constructor(
    public _dialogRef: MatDialogRef<UserRoleEditDiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.userData = this.fb.group({
      'userRole': [data?.['userRole'] || '', Validators.required],
      valid: [data?.valid || '', Validators.required],
    });
  }
  onNoClick(): void {
    this._dialogRef.close();
  }
  onSave() {
    if (this.userData.valid) {
      this._dialogRef.close(this.userData.value);
    }
  }
}
