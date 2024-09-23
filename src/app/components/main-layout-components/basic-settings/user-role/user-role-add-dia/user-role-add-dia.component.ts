import { Component, Inject } from '@angular/core';
import { MiniforminputComponent } from "../../../shared/miniforminput/miniforminput.component";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRoleComponent } from '../user-role.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-role-add-dia',
  standalone: true,
  imports: [MiniforminputComponent,MatDialogModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './user-role-add-dia.component.html',
  styleUrl: './user-role-add-dia.component.scss'
})
export class UserRoleAddDiaComponent {
  userData!:FormGroup
  constructor(public _dialogRef:MatDialogRef<UserRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private fb:FormBuilder,){
    this.userData=this.fb.group({
      'userRole':[data?.['userRole'] || '', Validators.required],
      'valid':[data?.['valid'] || '', Validators.required],
    })

  }
  onNoClick(): void {
    this._dialogRef.close();
  }
submit(){
  if (this.userData.valid) {
    this._dialogRef.close(this.userData.value); // Return the form values

    console.log(this.userData.value);
  } else {
    console.log('Form is invalid, please fill all required fields.');
  }
}
}