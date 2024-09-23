import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MiniforminputComponent } from '../../../shared/miniforminput/miniforminput.component';
import { CommodityCategoryComponent } from '../commodity-category.component';

@Component({
  selector: 'app-add-comodity-category-dialog',
  standalone: true,
  imports: [FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MiniforminputComponent,],
  templateUrl: './add-comodity-category-dialog.component.html',
  styleUrl: './add-comodity-category-dialog.component.scss'
})
export class AddComodityCategoryDialogComponent {
  userManagement!:FormGroup
  constructor(public _dialogRef:MatDialogRef<CommodityCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private fb:FormBuilder,){
    this.userManagement=this.fb.group({
      'userNumber':[data?.['userNumber'] || '', Validators.required],
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
