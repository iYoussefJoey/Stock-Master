import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MiniforminputComponent } from '../../../shared/miniforminput/miniforminput.component';
import { OwnerInformationComponent } from '../owner-information.component';

@Component({
  selector: 'app-edit-dialog-owner-info',
  standalone: true,
  imports: [MiniforminputComponent,MatDialogModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './edit-dialog-owner-info.component.html',
  styleUrl: './edit-dialog-owner-info.component.scss'
})
export class EditDialogOwnerInfoComponent {
  ownerInformationData!:FormGroup
  constructor(public _dialogRef:MatDialogRef<OwnerInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private fb:FormBuilder,){
    this.ownerInformationData=this.fb.group({
      'detailedAddress':[data?.['detailedAddress'] || '', Validators.required],
      'userName':[data?.['userName'] || '', Validators.required],
      'contactInformation':[data?.['contactInformation'] || '', Validators.required],
      'personInCharge':[data?.['personInCharge'] || '', Validators.required],
      'creator':[data?.['creator'] || '', Validators.required],
      'createTime':[data?.['createTime'] || '', Validators.required],
    })
  }
  onNoClick(): void {
    this._dialogRef.close();
  }
submit(){
  if (this.ownerInformationData.valid) {
    this._dialogRef.close(this.ownerInformationData.value); // Return the form values

    console.log(this.ownerInformationData.value);
  } else {
    console.log('Form is invalid, please fill all required fields.');
  }
}
}
