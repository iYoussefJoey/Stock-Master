import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MiniTableComponent } from '../../shared/mini-table/mini-table.component';
import { ToasterService } from '../../../services/toaster.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogWarehouseSetComponent } from './add-dialog-warehouse-set/add-dialog-warehouse-set.component';
import { EditDialogWarehouseSetComponent } from './edit-dialog-warehouse-set/edit-dialog-warehouse-set.component';
import { DeleteDialogWarehouseSetComponent } from './delete-dialog-warehouse-set/delete-dialog-warehouse-set.component';
import * as XLSX from 'xlsx'; // For XLSX
import { saveAs } from 'file-saver'; // For file-saver

@Component({
  selector: 'app-warehouse-setting',
  standalone: true,
  imports: [MiniTableComponent,MatCardModule],
  templateUrl: './warehouse-setting.component.html',
  styleUrl: './warehouse-setting.component.scss'
})
export class WarehouseSettingComponent implements OnInit {
  displayedColumns = [
    'number',
    'userName',
    'city',
    'address',
    'contactTelephone',
    'email',
    'role',
    'creator',
    'createTime',
    'valid',
  ];
  columnTranslationMap = {
    'number': 'warehouseNumber',
    'userName': 'warehouseName',
    'city': 'city',
    'address': 'address',
    'contactTelephone': 'contactTelephone',
    'email': 'email',
    'role': 'manager',
    'creator': 'creator',
    'createTime': 'createTime',
    'valid': 'valid',
  }
  warehousedata:  any[] = [
    {
      'number': '001',
      'userName':'bolbobolol',
      'city': 'Beijing',
      'address': 'Beijing',
      'contactTelephone': '1234567890',
      'email': '1234567890@qq.com',
      'role': 'Jiaqi',
      'creator':'lal',
      'createTime': '2022-01-01 00:00:00',
      'valid': 'Yes',
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
    {label:'warehouseName',
      placeholder:'Name',
    },
    {label:'city',
      placeholder:'City',
    },
    {label:'manager',
      placeholder:'Role',
    },
  ]
  constructor( private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toaster: ToasterService){  }
  ngOnInit(): void {
    const savedData = localStorage.getItem('warehousedata');
    if (savedData) {
      this.warehousedata = JSON.parse(savedData);
    } else {
      this.warehousedata = this.warehousedata;
    }
  }
  refresh(){
    window.location.reload()
  }
  download(){
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.warehousedata); // Converting JSON data to sheet
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the Excel file
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Warehouse-Setting-Information.xlsx');   }
  addWarehousedata(newUser:any){
    if (newUser) {
      const lastNum =
        this.warehousedata.length > 0
          ? Math.max(
              ...this.warehousedata.map(
                (item: { number: string | number }) => +item.number
              )
            )
          : 0;
      const newwarehousedata = {
        number: lastNum + 1,
        userName: newUser['userName'],
        city: newUser['city'],
        address: newUser['address'],
        contactTelephone: newUser['contactTelephone'],
        email: newUser['email'],
        role: newUser['role'],
        creator: newUser['creator'],
        createTime: newUser['createTime'],
        valid: newUser['valid'],
      };
   
      this.warehousedata.push(newwarehousedata);
      this.warehousedata = [...this.warehousedata];

      this.saveData();
    } else {
      console.log('Data not added');
    }
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(AddDialogWarehouseSetComponent, {
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
    const index = this.warehousedata.findIndex(
      (row: any) => row === selectedRow
    );
    if (index !== -1) {
      this.warehousedata[index] = {
        ...updatedData,
        number: selectedRow.number,
      };
      this.warehousedata = [...this.warehousedata];
      this.saveData();
      this.cdr.detectChanges();
    }
  }
  openEditDialog(selectedRow: any): void {
    const dialogRef = this._dialog.open(EditDialogWarehouseSetComponent, {
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
    const index = this.warehousedata.findIndex(
      (item: { number: any }) => item.number === row.number
    );
    this.warehousedata.splice(index, 1);
    this.warehousedata = [...this.warehousedata];
    console.log('deleted ROW: ', index, this.warehousedata);
    this.saveData();
    this.cdr.detectChanges();
  }

  openDeleteDialog(row: any) {
    const dialogRef = this._dialog.open(DeleteDialogWarehouseSetComponent, {
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
    localStorage.setItem('warehousedata', JSON.stringify(this.warehousedata));
  }
}
