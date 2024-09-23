import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CommodityManagementComponent } from '../commodity-management.component';
import { MatButtonModule } from '@angular/material/button';
import { MiniforminputComponent } from '../../../shared/miniforminput/miniforminput.component';

@Component({
  selector: 'app-edit-comod-managment-dialog',
  standalone: true,
  imports: [FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MiniforminputComponent,],
  templateUrl: './edit-comod-managment-dialog.component.html',
  styleUrl: './edit-comod-managment-dialog.component.scss'
})
export class EditComodManagmentDialogComponent {
  userManagement!: FormGroup | any;

  constructor(
    public _dialogRef: MatDialogRef<CommodityManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
      this.userManagement=this.fb.group({
        'userNumber':[data?.['userNumber'] || '', Validators.required],
        'userName':[data?.['userName'] || '', Validators.required],
        'role':[data?.['role'] || '', Validators.required],
        'commodityDescription':[data?.['commodityDescription'] || '', Validators.required],
        'supplierName':[data?.['supplierName'] || '', Validators.required],
        'brand':[data?.['brand'] || '', Validators.required],
        'specificationCode':[data?.['specificationCode'] || '', Validators.required],
        'commodityWeight':[data?.['commodityWeight'] || '', Validators.required],
        'commodityLength':[data?.['commodityLength'] || '', Validators.required],
        'commodityWidth':[data?.['commodityWidth'] || '', Validators.required],
        'commodityHeight':[data?.['commodityHeight'] || '', Validators.required],
        'commodityVolume':[data?.['commodityVolume'] || '', Validators.required],
        'commodityCost':[data?.['commodityCost'] || '', Validators.required],
        'commodityPrice':[data?.['commodityPrice'] || '', Validators.required],
    });
  }
  onNoClick(): void {
    this._dialogRef.close();
  }
  onSave() {
    if (this.userManagement.valid) {
      this._dialogRef.close(this.userManagement.value);
    }
  }
}
