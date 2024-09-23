import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MiniforminputComponent } from '../../shared/miniforminput/miniforminput.component';
import { ReceivingManagementComponent } from '../receiving-management.component';

@Component({
  selector: 'app-edit-receiving-manage-diaglog',
  standalone: true,
  imports: [ MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MiniforminputComponent,],
  templateUrl: './edit-receiving-manage-diaglog.component.html',
  styleUrl: './edit-receiving-manage-diaglog.component.scss'
})
export class EditReceivingManageDiaglogComponent {
  receivengData!: FormGroup | any;
  constructor(
    public _dialogRef: MatDialogRef<ReceivingManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.receivengData = this.fb.group({
      asnNumber: [data?.['asnNumber'] || '', Validators.required],
      batch: [data?.['batch'] || '', Validators.required],
      goodsOwnerName: [data?.['goodsOwnerName'] || '', Validators.required],
      estimatedTimeArrival: [data?.['estimatedTimeArrival'] || '', Validators.required],
    
    });
  }
  onNoClick(): void {
    this._dialogRef.close();
  }
  submit() {
    this._dialogRef.close(this.receivengData.value);
  }
}
