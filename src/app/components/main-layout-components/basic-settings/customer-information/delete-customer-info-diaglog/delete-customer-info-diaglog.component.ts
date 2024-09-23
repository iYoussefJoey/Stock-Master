import { Component, Inject } from '@angular/core';
import { CustomerInformationComponent } from '../customer-information.component';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-customer-info-diaglog',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,],
  templateUrl: './delete-customer-info-diaglog.component.html',
  styleUrl: './delete-customer-info-diaglog.component.scss'
})
export class DeleteCustomerInfoDiaglogComponent {
  userName!: string;
  constructor(
    public _dialogRef: MatDialogRef<CustomerInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.userName = this.data['userName'];
    console.log(this.data);
  }
  onNoClick(): void {
    this._dialogRef.close(false);
  }
  submit() {
    this._dialogRef.close(true);
  }
}
