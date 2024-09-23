import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MiniTableComponent } from '../../shared/mini-table/mini-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../../services/toaster.service';
import { AddDialogOwnerInfoComponent } from './add-dialog-owner-info/add-dialog-owner-info.component';
import { EditDialogOwnerInfoComponent } from './edit-dialog-owner-info/edit-dialog-owner-info.component';
import { DeleteDialogOwnerInfoComponent } from './delete-dialog-owner-info/delete-dialog-owner-info.component';
import * as XLSX from 'xlsx'; // For XLSX
import { saveAs } from 'file-saver'; // For file-saver

@Component({
  selector: 'app-owner-information',
  standalone: true,
  imports: [MiniTableComponent,MatCardModule],
  templateUrl: './owner-information.component.html',
  styleUrl: './owner-information.component.scss'
})
export class OwnerInformationComponent implements OnInit{
  displayedColumns = [
    'number',
    'userName',
    'detailedAddress',
    'contactInformation',
    'personInCharge',
    'creator',
    'createTime',
  ];
  columnTranslationMap = {
    'number': 'number',
    'userName': 'ownerOfCargo',
    'detailedAddress': 'detailedAddress',
    'contactInformation': 'contactInformation',
    'personInCharge': 'personInCharge',
    'creator': 'creator',
    'createTime': 'createTime',
  }
  cargoOwnerInformation:  any[] = [
    {
      'number': '001',
      'userName': 'modric',
      'detailedAddress': 'rolo',
      'contactInformation': '1234567890',
      'personInCharge': '1234567890@qq.com',
      'creator':'lal',
      'createTime': '2022-01-01 00:00:00',
    }
  ]
 

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
  ];
  inputForm = [
    {label:'ownerOfCargo',
      placeholder:'Name',
    },
 
  ]
  constructor( private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toaster: ToasterService){  }
  ngOnInit(): void {
    const savedData = localStorage.getItem('cargoOwnerInformation');
    if (savedData) {
      this.cargoOwnerInformation = JSON.parse(savedData);
    } else {
      this.cargoOwnerInformation = this.cargoOwnerInformation;
    }
  }
  refresh(){
    window.location.reload()
  }
  download(){
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.cargoOwnerInformation); // Converting JSON data to sheet
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the Excel file
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Cargo-Owner-Information.xlsx'); 
  }
  addWarehousedata(newUser:any){
    if (newUser) {
      const lastNum =
        this.cargoOwnerInformation.length > 0
          ? Math.max(
              ...this.cargoOwnerInformation.map(
                (item: { number: string | number }) => +item.number
              )
            )
          : 0;
      const cargoOwnerInformation = {
        number: lastNum + 1,
        userName: newUser['userName'],
        detailedAddress: newUser['detailedAddress'],
        contactInformation: newUser['contactInformation'],
        personInCharge: newUser['personInCharge'],
        creator: newUser['creator'],
        createTime: newUser['createTime'],
      };
      this.cargoOwnerInformation.push(cargoOwnerInformation);
      this.cargoOwnerInformation = [...this.cargoOwnerInformation];

      this.saveData();
    } else {
      console.log('Data not added');
    }
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(AddDialogOwnerInfoComponent, {
      width: '450px',
      height: '550px',
      disableClose: true,
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.addWarehousedata(result);
        this.toaster.addedSnackBar();
        console.log('The dialog was closed');
      } else {
        console.log('dialog closed without Data!!');
      }
    });
  }
  updatedRow(selectedRow: any, updatedData: any) {
    const index = this.cargoOwnerInformation.findIndex(
      (row: any) => row === selectedRow
    );
    if (index !== -1) {
      this.cargoOwnerInformation[index] = {
        ...updatedData,
        number: selectedRow.number,
      };
      this.cargoOwnerInformation = [...this.cargoOwnerInformation];
      this.saveData();
      this.cdr.detectChanges();
    }
  }
  openEditDialog(selectedRow: any): void {
    const dialogRef = this._dialog.open(EditDialogOwnerInfoComponent, {
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
    const index = this.cargoOwnerInformation.findIndex(
      (item: { number: any }) => item.number === row.number
    );
    this.cargoOwnerInformation.splice(index, 1);
    this.cargoOwnerInformation = [...this.cargoOwnerInformation];
    console.log('deleted ROW: ', index, this.cargoOwnerInformation);
    this.saveData();
    this.cdr.detectChanges();
  }

  openDeleteDialog(row: any) {
    const dialogRef = this._dialog.open(DeleteDialogOwnerInfoComponent, {
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
    localStorage.setItem('cargoOwnerInformation', JSON.stringify(this.cargoOwnerInformation));
  }
}
