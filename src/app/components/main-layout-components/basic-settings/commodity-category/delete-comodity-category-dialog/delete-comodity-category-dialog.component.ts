import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CommodityCategoryComponent } from '../commodity-category.component';

@Component({
  selector: 'app-delete-comodity-category-dialog',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,],
  templateUrl: './delete-comodity-category-dialog.component.html',
  styleUrl: './delete-comodity-category-dialog.component.scss'
})
export class DeleteComodityCategoryDialogComponent {
  userNumber!: string;
  constructor(
    public _dialogRef: MatDialogRef<CommodityCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.userNumber = this.data['userNumber'];
    console.log(this.data);
  }
  onNoClick(): void {
    this._dialogRef.close(false);
  }
  submit() {
    this._dialogRef.close(true);
  }
}
