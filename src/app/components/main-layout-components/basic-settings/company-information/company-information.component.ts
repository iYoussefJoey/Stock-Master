import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MiniTableComponent } from '../../shared/mini-table/mini-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDialogComponent } from './company-dialog/company-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ToasterService } from '../../../services/toaster.service';
import * as XLSX from 'xlsx'; // For XLSX
import { saveAs } from 'file-saver'; // For file-saver

@Component({
  selector: 'app-company-information',
  standalone: true,
  imports: [MiniTableComponent, MatCardModule,ReactiveFormsModule],
  templateUrl: './company-information.component.html',
  styleUrl: './company-information.component.scss',
})
export class CompanyInformationComponent implements OnInit {
  displayedColumns = [
    'num',
    'Corporate Name',
    'City',
    'Detailed Address',
    'Person in Charge',
    'contact Information',
  ];
  columnTranslationMap: { [key: string]: string } = {
    'num': 'number',
    'Corporate Name': 'corporateName',
    'City': 'city',
    'Detailed Address': 'detailedAddress',
    'Person in Charge': 'personInCharge',
    'contact Information': 'contactInformation'

  };
  parentOneData:  any[] = []
 

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
    private toaster:ToasterService
  ) {

  }
  
    
  ngOnInit(): void {
    const savedData = localStorage.getItem('parentOneData');
    if (savedData) {
      this.parentOneData = JSON.parse(savedData);
    } else {
      this.parentOneData = this.parentOneData;
    }
  }
  addNewRow(newData: any): void {
    if (newData) {
      const lastNum =
        this.parentOneData.length > 0
          ? Math.max(...this.parentOneData.map((item: { num: string | number; }) => +item.num))
          : 0;
      const newCompanyData = {
        num: (lastNum + 1).toString(), // Auto-increment the row number
        'Corporate Name': newData['Corporate Name'],
        City: newData['City'],
        'Detailed Address': newData['Detailed Address'],
        'Person in Charge': newData['Person in Charge'],
        'contact Information': newData['contact Information'],
      };
      this.parentOneData.push(newCompanyData);
      this.parentOneData = [...this.parentOneData];
      this.saveData();
    } else {
      console.log('No data provided');
    }
  }
  refresh(): void {
    window.location.reload();
  }
  download(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.parentOneData); // Converting JSON data to sheet
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the Excel file
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Company-Information.xlsx'); 
  }
  saveData(): void {
    localStorage.setItem('parentOneData', JSON.stringify(this.parentOneData));
  }




  openDialog(): void {
    const dialogRef = this._dialog.open(CompanyDialogComponent, {
      width: '450px',
      height: '600px',
      disableClose: true,
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.addNewRow(result);
        this.toaster.addedSnackBar()
      } else {
        console.log('dialog closed without Data!!');
      }
    });
  }

  updatedRow(selectedRow:any , updatedData:any){
    const index = this.parentOneData.findIndex((row:any) => row === selectedRow)
    if(index !== -1 ){
      this.parentOneData[index] = {...updatedData, num: selectedRow.num}
      this.parentOneData = [...this.parentOneData]
      this.saveData()
      this.cdr.detectChanges()
    }
  }

  openEditDialog(selectedRow:any): void {
    const dialogRef = this._dialog.open(EditDialogComponent, {
      width: '450px',
      height: '600px',
      disableClose: true,
      data: selectedRow,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Update the row or handle the result here
        this.updatedRow(selectedRow, result);
        this.toaster.editSnackBar()
      } else {
        console.log('Dialog closed without Data!!');
      }
    });
  }




  deleteRow(row: any): void {
    const index = this.parentOneData.findIndex((item: { num: any; }) => item.num === row.num);
    this.parentOneData.splice(index, 1);
    this.parentOneData = [...this.parentOneData];
    console.log('deleted ROW: ', index, this.parentOneData);
    this.saveData();
    this.cdr.detectChanges();
  }






  openDeleteDialog(row: any) {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      width: '450px',
      disableClose: true,
      data: row,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.deleteRow(row);
        this.toaster.deletedSnackBar()
        console.log('Selected row is deleted and dialog is closed');
      }
    });
  }
}
