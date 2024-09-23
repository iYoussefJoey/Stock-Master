import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MiniforminputComponent } from '../../../shared/miniforminput/miniforminput.component';
import { OwnerInformationComponent } from '../../owner-information/owner-information.component';
import { FreightSettingComponent } from '../freight-setting.component';

@Component({
  selector: 'app-edit-dialog-freight-settings',
  standalone: true,
  imports: [MiniforminputComponent,MatDialogModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './edit-dialog-freight-settings.component.html',
  styleUrl: './edit-dialog-freight-settings.component.scss'
})
export class EditDialogFreightSettingsComponent {
  freightSettingsData!:FormGroup
  constructor(public _dialogRef:MatDialogRef<FreightSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private fb:FormBuilder,){
    this.freightSettingsData=this.fb.group({
      'userName':[data?.['userName'] || '', Validators.required],
      'departureCity':[data?.['departureCity'] || '', Validators.required],
      'arrivalCity':[data?.['arrivalCity'] || '', Validators.required],
      'weightFee':[data?.['weightFee'] || '', Validators.required],
      'volumeFee':[data?.['volumeFee'] || '', Validators.required],
      'minPayment':[data?.['minPayment'] || '', Validators.required],
      'creator':[data?.['creator'] || '', Validators.required],
      'createTime':[data?.['createTime'] || '', Validators.required],
      'valid':[data?.['valid'] || '', Validators.required],
    })
  }
  onNoClick(): void {
    this._dialogRef.close();
  }
submit(){
  if (this.freightSettingsData.valid) {
    this._dialogRef.close(this.freightSettingsData.value); // Return the form values

    console.log(this.freightSettingsData.value);
  } else {
    console.log('Form is invalid, please fill all required fields.');
  }
}
}
