import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private _snackBar = inject(MatSnackBar);
  constructor() { }
  horizontalPosition: MatSnackBarHorizontalPosition  = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  addedSnackBar() {
    this._snackBar.open("You've successfully added your item ", 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar-success'], 

    });
  }
  loginSnackBar() {
    this._snackBar.open("You've successfully logged in ", 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar-success'], 

    });
  }
  deletedSnackBar() {
    this._snackBar.open("You've successfully Deleted your item ", 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar-error'], 
    });
  }
  editSnackBar() {
    this._snackBar.open("You've successfully Edited your item ", 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar-info'], 

    });
  }
  errorSnackBar() {
    this._snackBar.open("ERROR please check your data", 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
            panelClass: ['snackbar-error'],

    });
  }
}
