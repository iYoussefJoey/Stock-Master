import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MiniforminputComponent } from '../../../shared/miniforminput/miniforminput.component';
import { WarehouseSettingComponent } from '../warehouse-setting.component';

@Component({
  selector: 'app-edit-dialog-warehouse-set',
  standalone: true,
  imports: [MiniforminputComponent,MatDialogModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './edit-dialog-warehouse-set.component.html',
  styleUrl: './edit-dialog-warehouse-set.component.scss'
})
export class EditDialogWarehouseSetComponent {
  warehouseUserSettings!:FormGroup
  constructor(public _dialogRef:MatDialogRef<WarehouseSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private fb:FormBuilder,){
    this.warehouseUserSettings=this.fb.group({
      'userName':[data?.['city'] || '', Validators.required],
      'city':[data?.['city'] || '', Validators.required],
      'address':[data?.['address'] || '', Validators.required],
      'contactTelephone':[data?.['contactTelephone'] || '', Validators.required],
      'email':[data?.['email'] || '', Validators.required],
      'role':[data?.['role'] || '', Validators.required],
      'creator':[data?.['creator'] || '', Validators.required],
      'createTime':[data?.['createTime'] || '', Validators.required],
      'valid':[data?.['valid'] || '', Validators.required],
    })


  }
  onNoClick(): void {
    this._dialogRef.close();
  }
submit(){
  if (this.warehouseUserSettings.valid) {
    this._dialogRef.close(this.warehouseUserSettings.value); // Return the form values

    console.log(this.warehouseUserSettings.value);
  } else {
    console.log('Form is invalid, please fill all required fields.');
  }
}
}
