import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MiniforminputComponent } from '../../../shared/miniforminput/miniforminput.component';
import { CustomerInformationComponent } from '../customer-information.component';

@Component({
  selector: 'app-add-customer-info-diaglog',
  standalone: true,
  imports: [MiniforminputComponent,MatDialogModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './add-customer-info-diaglog.component.html',
  styleUrl: './add-customer-info-diaglog.component.scss'
})
export class AddCustomerInfoDiaglogComponent {
  customerInfoData!:FormGroup
  constructor(public _dialogRef:MatDialogRef<CustomerInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private fb:FormBuilder,){
    this.customerInfoData=this.fb.group({
      'userName':[data?.['userName'] || '', Validators.required],
      'city':[data?.['city'] || '', Validators.required],
      'manager':[data?.['manager'] || '', Validators.required],
      'email':[data?.['email'] || '', Validators.required],
      'contactTelephone':[data?.['contactTelephone'] || '', Validators.required],
      'creator':[data?.['creator'] || '', Validators.required],
      'createTime':[data?.['createTime'] || '', Validators.required],
      'lastUpdateTime':[data?.['lastUpdateTime'] || '', Validators.required],
    })
  }
  onNoClick(): void {
    this._dialogRef.close();
  }
submit(){
  if (this.customerInfoData.valid) {
    this._dialogRef.close(this.customerInfoData.value); // Return the form values

    console.log(this.customerInfoData.value);
  } else {
    console.log('Form is invalid, please fill all required fields.');
  }
}
}
