import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MiniforminputComponent } from '../../../shared/miniforminput/miniforminput.component';
import { UsermanagementComponent } from '../usermanagement.component';

@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [MiniforminputComponent,MatDialogModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.scss'
})
export class AddDialogComponent {
  userManagement!:FormGroup
  constructor(public _dialogRef:MatDialogRef<UsermanagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private fb:FormBuilder,){
    this.userManagement=this.fb.group({
      'userNumber':[data?.['userNumber'] || '', Validators.required],
      'userName':[data?.['userName'] || '', Validators.required],
      'role':[data?.['role'] || '', Validators.required],
      'sex':[data?.['sex'] || '', Validators.required],
      'valid':[data?.['valid'] || '', Validators.required],
      'contactInformation':[data?.['contactInformation'] || '', Validators.required],
    })
 

  }
  onNoClick(): void {
    this._dialogRef.close();
  }
submit(){
  if (this.userManagement.valid) {
    this._dialogRef.close(this.userManagement.value); // Return the form values

    console.log(this.userManagement.value);
  } else {
    console.log('Form is invalid, please fill all required fields.');
  }
}
}
