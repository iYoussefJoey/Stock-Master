import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MiniforminputComponent } from "../../../shared/miniforminput/miniforminput.component";

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule, MiniforminputComponent],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent {
  company!: FormGroup | any;

 
  constructor (
    public _dialogRef:MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
  private fb:FormBuilder) {
    this.company = this.fb.group({
      'Corporate Name': [data?.['Corporate Name'] || '', Validators.required],
      City: [data?.City || '', Validators.required],
      'Detailed Address': [data?.['Detailed Address'] || '', Validators.required],
      'Person in Charge': [data?.['Person in Charge'] || '', Validators.required],
      'contact Information': [data?.['contact Information'] || '', Validators.required]
    });
  }
  onNoClick(): void {
    this._dialogRef.close();
  }
onSave(){
  if(this.company.valid){
    this._dialogRef.close(this.company.value);
  }
}
}
