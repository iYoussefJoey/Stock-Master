import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MiniTableComponent } from '../../shared/mini-table/mini-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../../services/toaster.service';
import { AddComodityCategoryDialogComponent } from './add-comodity-category-dialog/add-comodity-category-dialog.component';
import { EditComodityCategoryDialogComponent } from './edit-comodity-category-dialog/edit-comodity-category-dialog.component';
import { DeleteComodityCategoryDialogComponent } from './delete-comodity-category-dialog/delete-comodity-category-dialog.component';
import * as XLSX from 'xlsx'; // For XLSX
import { saveAs } from 'file-saver'; // For file-saver

@Component({
  selector: 'app-commodity-category',
  standalone: true,
  imports: [MiniTableComponent, MatCardModule],
  templateUrl: './commodity-category.component.html',
  styleUrl: './commodity-category.component.scss',
})
export class CommodityCategoryComponent implements OnInit {
  displayedColumns = [
    'number',
    'userNumber',
    'role',
    'sex',
    'contactInformation',
    'valid',
  ];
  columnTranslationMap = {
    number: 'number',
    userNumber: 'userNumber',
    role: 'role',
    sex: 'sex',
    contactInformation: 'contactInformation',
    valid: 'valid',
  };
  commodityCategoryUser: any[] = [
    {
      number: 1,
      userNumber: '001',
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
      label: 'ios_share',
      action: () => this.download(),
    },
  ];

  constructor(
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toaster: ToasterService
  ) {}
  ngOnInit(): void {
    const savedData = localStorage.getItem('commodityCategoryUser');
    if (savedData) {
      this.commodityCategoryUser = JSON.parse(savedData);
    } else {
      this.commodityCategoryUser = this.commodityCategoryUser;
    }
  }
  refresh() {
    window.location.reload();
  }
  download() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.commodityCategoryUser); // Converting JSON data to sheet
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the Excel file
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'CommodityCategory.xlsx'); 
   }
  addCommodityCategory(newUser: any): void {
    if (newUser) {
      const lastNum =
        this.commodityCategoryUser.length > 0
          ? Math.max(
              ...this.commodityCategoryUser.map(
                (item: { number: string | number }) => +item.number
              )
            )
          : 0;
      const newcommodityCategoryUser = {
        number: lastNum + 1,
        userNumber: newUser['userNumber'],
        role: newUser['role'],
        sex: newUser['sex'],
        contactInformation: newUser['contactInformation'],
        valid: newUser['valid'],
      };
      this.commodityCategoryUser.push(newcommodityCategoryUser);
      this.commodityCategoryUser = [...this.commodityCategoryUser];

      this.saveData();
    } else {
      console.log('Data not added');
    }
  }
  openDialog(): void {
    const dialogRef = this._dialog.open(AddComodityCategoryDialogComponent, {
      width: '450px',
      height: '550px',
      disableClose: true,
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.addCommodityCategory(result);
        this.toaster.addedSnackBar();
      } else {
        console.log('dialog closed without Data!!');
      }
    });
  }
  updatedRow(selectedRow: any, updatedData: any) {
    const index = this.commodityCategoryUser.findIndex(
      (row: any) => row === selectedRow
    );
    if (index !== -1) {
      this.commodityCategoryUser[index] = {
        ...updatedData,
        number: selectedRow.number,
      };
      this.commodityCategoryUser = [...this.commodityCategoryUser];
      this.saveData();
      this.cdr.detectChanges();
    }
  }
  openEditDialog(selectedRow: any): void {
    const dialogRef = this._dialog.open(EditComodityCategoryDialogComponent, {
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
      } else {
        this.toaster.errorSnackBar();
      }
    });
  }
  deleteRow(row: any): void {
    const index = this.commodityCategoryUser.findIndex(
      (item: { number: any }) => item.number === row.number
    );
    this.commodityCategoryUser.splice(index, 1);
    this.commodityCategoryUser = [...this.commodityCategoryUser];
    this.saveData();
    this.cdr.detectChanges();
  }

  openDeleteDialog(row: any) {
    const dialogRef = this._dialog.open(DeleteComodityCategoryDialogComponent, {
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
    localStorage.setItem('commodityCategoryUser', JSON.stringify(this.commodityCategoryUser));
  }
}
