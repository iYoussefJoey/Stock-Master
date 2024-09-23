import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MiniforminputComponent } from '../../../shared/miniforminput/miniforminput.component';
import { SupplierInfoComponent } from '../supplier-info.component';

@Component({
  selector: 'app-edit-dialog-supp-info',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MiniforminputComponent,],
  templateUrl: './edit-dialog-supp-info.component.html',
  styleUrl: './edit-dialog-supp-info.component.scss'
})
export class EditDialogSuppInfoComponent {
  supplierData!: FormGroup | any;
  constructor(
    public _dialogRef: MatDialogRef<SupplierInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.supplierData = this.fb.group({
      userName: [data?.['userName'] || '', Validators.required],
      city: [data?.city || '', Validators.required],
      address: [data?.['address'] || '', Validators.required],
      manager: [data?.['manager'] || '', Validators.required],
      email: [data?.['email'] || '', Validators.required],
      contactTelephone: [data?.['contactTelephone'] || '', Validators.required],
      creator: [data?.['creator'] || '', Validators.required],
      createTime: [data?.['createTime'] || '', Validators.required],
      lastUpdateTime: [data?.['lastUpdateTime'] || '', Validators.required],
    });
  }
  onNoClick(): void {
    this._dialogRef.close();
  }
  submit() {
    this._dialogRef.close(this.supplierData.value);
  }
}

