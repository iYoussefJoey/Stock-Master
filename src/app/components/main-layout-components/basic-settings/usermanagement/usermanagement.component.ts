import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MiniTableComponent } from '../../shared/mini-table/mini-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../../services/toaster.service';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { UserManagementEditDiaComponent } from './user-management-edit-dia/user-management-edit-dia.component';
import { UserManagementDeleteDiaComponent } from './user-management-delete-dia/user-management-delete-dia.component';
import * as XLSX from 'xlsx'; // For XLSX
import { saveAs } from 'file-saver'; // For file-saver

@Component({
  selector: 'app-usermanagement',
  standalone: true,
  imports: [MiniTableComponent, MatCardModule],
  templateUrl: './usermanagement.component.html',
  styleUrl: './usermanagement.component.scss',
})
export class UsermanagementComponent implements OnInit {
  displayedColumns = [
    'number',
    'userNumber',
    'userName',
    'role',
    'sex',
    'contactInformation',
    'valid',
  ];
  columnTranslationMap = {
    number: 'number',
    userNumber: 'userNumber',
    userName: 'userName',
    role: 'role',
    sex: 'sex',
    contactInformation: 'contactInformation',
    valid: 'valid',
  };
  userManagement: any[] = [
    {
      number: 1,
      userNumber: '001',
      userName: 'Admin',
      role: 'Admin',
      sex: 'Male',
      contactInformation: '1234567890',
      valid: 'Yes',
    },
  ];

  actionButtons = [
    {
      label: 'edit',
      color: 'primary',
      action: (element: any) => {
        this.openEditDialog(element);
      },
    },
    {
      label: 'delete',
      color: 'warn',
      action: (element: any) => {
        this.openDeleteDialog(element);
      },
    },
  ];
  actionButtonsAboveTable = [
    {
      label: 'add',
      action: () => this.openDialog(),
    },
    {
      label: 'refresh',
      action: () => this.refresh(),
    },
    {
      label: 'currency_exchange',
      action: () => this.download(),
    },
    {
      label: 'ios_share',
      action: () => this.download(),
    },
    {
      label: 'lock_reset',
      action: () => this.download(),
    },
  ];
  inputForm = [
    { label: 'userNumber', placeholder: 'Number' },
    { label: 'userName', placeholder: 'Name' },
    { label: 'role', placeholder: 'Role' },
  ];
  constructor(
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toaster: ToasterService
  ) {}
  ngOnInit(): void {
    const savedData = localStorage.getItem('userManagement');
    if (savedData) {
      this.userManagement = JSON.parse(savedData);
    } else {
      this.userManagement = this.userManagement;
    }
  }
  refresh() {
    window.location.reload();
  }
  download() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.userManagement); // Converting JSON data to sheet
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the Excel file
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'User-Managament-Information.xlsx'); 

      }
  addUserManagement() {}
  addNewUserManagement(newUser: any) {
    if (newUser) {
      const lastNum =
        this.userManagement.length > 0
          ? Math.max(
              ...this.userManagement.map(
                (item: { number: string | number }) => +item.number
              )
            )
          : 0;
      const newuserManagement = {
        number: lastNum + 1,
        userNumber: newUser['userNumber'],
        userName: newUser['userName'],
        role: newUser['role'],
        sex: newUser['sex'],
        contactInformation: newUser['contactInformation'],
        valid: newUser['valid'],
      };
      this.userManagement.push(newuserManagement);
      this.userManagement = [...this.userManagement];

      this.saveData();
    } else {
      console.log('Data not added');
    }
  }
  openDialog(): void {
    const dialogRef = this._dialog.open(AddDialogComponent, {
      width: '450px',
      height: '550px',
      disableClose: true,
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.addNewUserManagement(result);
        this.toaster.addedSnackBar();
        console.log('The dialog was closed');
      } else {
        console.log('dialog closed without Data!!');
      }
    });
  }
  updatedRow(selectedRow: any, updatedData: any) {
    const index = this.userManagement.findIndex(
      (row: any) => row === selectedRow
    );
    if (index !== -1) {
      this.userManagement[index] = {
        ...updatedData,
        number: selectedRow.number,
      };
      this.userManagement = [...this.userManagement];
      this.saveData();
      this.cdr.detectChanges();
    }
  }
  openEditDialog(selectedRow: any): void {
    const dialogRef = this._dialog.open(UserManagementEditDiaComponent, {
      width: '450px',
      height: '550px',
      disableClose: true,
      data: selectedRow,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Update the row or handle the result here
        this.updatedRow(selectedRow, result);
        this.toaster.editSnackBar();
        console.log('The dialog was closed');
      } else {
        console.log('Dialog closed without Data!!');
      }
    });
  }
  deleteRow(row: any): void {
    const index = this.userManagement.findIndex(
      (item: { number: any }) => item.number === row.number
    );
    this.userManagement.splice(index, 1);
    this.userManagement = [...this.userManagement];
    console.log('deleted ROW: ', index, this.userManagement);
    this.saveData();
    this.cdr.detectChanges();
  }

  openDeleteDialog(row: any) {
    const dialogRef = this._dialog.open(UserManagementDeleteDiaComponent, {
      width: '450px',
      height: '250px',
      disableClose: true,
      data: row,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.deleteRow(row);
        this.toaster.deletedSnackBar();
        console.log('Selected row is deleted and dialog is closed');
      }
    });
  }
  saveData(): void {
    localStorage.setItem('userManagement', JSON.stringify(this.userManagement));
  }
}
