import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MiniTableComponent } from '../../shared/mini-table/mini-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../../services/toaster.service';
import { AddComodManagmentDialogComponent } from './add-comod-managment-dialog/add-comod-managment-dialog.component';
import { EditComodManagmentDialogComponent } from './edit-comod-managment-dialog/edit-comod-managment-dialog.component';
import { DeleteComodManagmentDialogComponent } from './delete-comod-managment-dialog/delete-comod-managment-dialog.component';
import * as XLSX from 'xlsx'; // For XLSX
import { saveAs } from 'file-saver'; // For file-saver

@Component({
  selector: 'app-commodity-management',
  standalone: true,
  imports: [MiniTableComponent,MatCardModule],
  templateUrl: './commodity-management.component.html',
  styleUrl: './commodity-management.component.scss'
})
export class CommodityManagementComponent implements OnInit {
  displayedColumns = [
    'number',
    'userNumber',
    'userName',
    'role',
    'commodityDescription',
    'supplierName',
    'brand',
    'specificationCode',
    'commodityWeight',
    'commodityLength',
    'commodityWidth',
    'commodityHeight',
    'commodityVolume',
    'commodityCost',
    'commodityPrice',
  ];
  columnTranslationMap = {
    'number': 'number',
    'userNumber': 'commodityCode',
    'userName': 'commodityName',
    'role': 'commodityCategory',
    'commodityDescription': 'commodityDescription',
    'supplierName': 'supplierName',
    'brand': 'brand',
    'specificationCode': 'specificationCode',
    'commodityWeight': 'commodityWeight',
    'commodityLength': 'commodityLength',
    'commodityWidth': 'commodityWidth',
    'commodityHeight': 'commodityHeight',
    'commodityVolume': 'commodityVolume',
    'commodityCost': 'commodityCost',
    'commodityPrice': 'commodityPrice',
  }
  adminManagement:  any[] = [
    {
      'number': 1,
      'userNumber' : '0313101',
      'userName' : 'Appleee',
      'role' : 'Fruits',
      'commodityDescription' : 'Fruits',
      'supplierName' : 'Apple Inc.',
      'brand' : 'Apple',
      'specificationCode' : '001',
      'commodityWeight' : '10',
      'commodityLength' : '10',
      'commodityWidth' : '10',
      'commodityHeight' : '10',
      'commodityVolume' : '10',
      'commodityCost' : '10',
      'commodityPrice' : '10',
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
      label: 'ios_share',
      action: () => this.download(),
    },
    {
      label: 'qr_code_scanner',
      action: () => this.download(),
    },
    {
      label: 'barcode_reader',
      action: () => this.download(),
    },
    {
      label: 'print',
      action: () => this.download(),
    },
  ];
  inputForm = [
    {label:'commodityCode',
      placeholder:'Number',
    },
    {label:'commodityName',
      placeholder:'Name',
    },
    {label:'commodityCategory',
      placeholder:'Role',
    },
  ]
  constructor(  private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toaster: ToasterService){  }
  ngOnInit(): void {
    const savedData = localStorage.getItem('adminManagement');
    if (savedData) {
      this.adminManagement = JSON.parse(savedData);
    } else {
      this.adminManagement = this.adminManagement;
    }
  }
  refresh(){
    window.location.reload()
  }
  download(){
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.adminManagement); // Converting JSON data to sheet
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the Excel file
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Commodity-Management.xlsx'); 
  }
  addAdminCommodityManagement(newUser:any){
    if (newUser) {
      const lastNum =
        this.adminManagement.length > 0
          ? Math.max(
              ...this.adminManagement.map(
                (item: { number: string | number }) => +item.number
              )
            )
          : 0;
      const newadminManagement = {
        number: lastNum + 1,
        userNumber: newUser['userNumber'],
        userName: newUser['userName'],
        role: newUser['role'],
        commodityDescription: newUser['commodityDescription'],
        supplierName: newUser['supplierName'],
        brand: newUser['brand'],
        specificationCode: newUser['specificationCode'],
        commodityWeight: newUser['commodityWeight'],
        commodityLength: newUser['commodityLength'],
        commodityWidth: newUser['commodityWidth'],
        commodityHeight: newUser['commodityHeight'],
        commodityVolume: newUser['commodityVolume'],
        commodityCost: newUser['commodityCost'],
        commodityPrice: newUser['commodityPrice'],
     
      };
      this.adminManagement.push(newadminManagement);
      this.adminManagement = [...this.adminManagement];

      this.saveData();
    } else {
      console.log('Data not added');
    }
  }
  openDialog(): void {
    const dialogRef = this._dialog.open(AddComodManagmentDialogComponent, {
      width: '450px',
      height: '550px',
      disableClose: true,
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.addAdminCommodityManagement(result);
        this.toaster.addedSnackBar();
      } else {
        console.log('dialog closed without Data!!');
      }
    });
  }
  updatedRow(selectedRow: any, updatedData: any) {
    const index = this.adminManagement.findIndex(
      (row: any) => row === selectedRow
    );
    if (index !== -1) {
      this.adminManagement[index] = {
        ...updatedData,
        number: selectedRow.number,
      };
      this.adminManagement = [...this.adminManagement];
      this.saveData();
      this.cdr.detectChanges();
    }
  }
  openEditDialog(selectedRow: any): void {
    const dialogRef = this._dialog.open(EditComodManagmentDialogComponent, {
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
    const index = this.adminManagement.findIndex(
      (item: { number: any }) => item.number === row.number
    );
    this.adminManagement.splice(index, 1);
    this.adminManagement = [...this.adminManagement];
    this.saveData();
    this.cdr.detectChanges();
  }

  openDeleteDialog(row: any) {
    const dialogRef = this._dialog.open(DeleteComodManagmentDialogComponent, {
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
    localStorage.setItem('adminManagement', JSON.stringify(this.adminManagement));
  }
}
