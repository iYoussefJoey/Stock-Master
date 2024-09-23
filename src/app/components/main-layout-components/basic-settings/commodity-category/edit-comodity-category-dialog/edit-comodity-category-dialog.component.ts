import { Component, Inject } from '@angular/core';
import { MiniforminputComponent } from '../../../shared/miniforminput/miniforminput.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommodityCategoryComponent } from '../commodity-category.component';

@Component({
  selector: 'app-edit-comodity-category-dialog',
  standalone: true,
  imports: [FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MiniforminputComponent,],
  templateUrl: './edit-comodity-category-dialog.component.html',
  styleUrl: './edit-comodity-category-dialog.component.scss'
})
export class EditComodityCategoryDialogComponent {
  userManagement!: FormGroup | any;

  constructor(
    public _dialogRef: MatDialogRef<CommodityCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.userManagement = this.fb.group({
      'userNumber':[data?.['userNumber'] || '', Validators.required],
      'role':[data?.['role'] || '', Validators.required],
      'sex':[data?.['sex'] || '', Validators.required],
      'valid':[data?.['valid'] || '', Validators.required],
      'contactInformation':[data?.['contactInformation'] || '', Validators.required],
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
