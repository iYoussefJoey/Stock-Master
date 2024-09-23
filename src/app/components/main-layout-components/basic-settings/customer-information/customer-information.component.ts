import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MiniTableComponent } from '../../shared/mini-table/mini-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../../services/toaster.service';
import { DeleteCustomerInfoDiaglogComponent } from './delete-customer-info-diaglog/delete-customer-info-diaglog.component';
import { EditCustomerInfoDiaglogComponent } from './edit-customer-info-diaglog/edit-customer-info-diaglog.component';
import { AddCustomerInfoDiaglogComponent } from './add-customer-info-diaglog/add-customer-info-diaglog.component';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
@Component({
  selector: 'app-customer-information',
  standalone: true,
  imports: [MiniTableComponent,MatCardModule],
  templateUrl: './customer-information.component.html',
  styleUrl: './customer-information.component.scss'
})
export class CustomerInformationComponent implements OnInit {
  displayedColumns = [
    'number',
    'userName',
    'city',
    'manager',
    'email',
    'contactTelephone',
    'creator',
    'createTime',
    'lastUpdateTime',
  ];
  columnTranslationMap = {
    'number': 'number',
    'userName': 'customerName',
    'city': 'city',
    'manager': 'manager',
    'email': 'email',
    'contactTelephone': 'contactTelephone',
    'creator': 'creator',
    'createTime': 'createTime',
    'lastUpdateTime': 'lastUpdateTime',
  }
  customerInfoData:  any[] = [
    {
      'number': '1',
      'userName': 'modric',
      'city': 'rolo',
      'manager': '1234567890',
      'email': '1234567890@qq.com',
      'contactTelephone':'lal',
      'creator': '17/9/2024 00:00:00',
      'createTime': '17/9/2024 00:00:00',
      'lastUpdateTime': 'True',
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
    {
      label: 'print',
      action: () => this.download(),
    },
  ];
  inputForm = [
    {label:'customerName',
      placeholder:'Name',
    },
 
  ]
    constructor( private _dialog: MatDialog,
      private cdr: ChangeDetectorRef,
      private toaster: ToasterService){  }
    ngOnInit(): void {
      const savedData = localStorage.getItem('customerInfoData');
      if (savedData) {
        this.customerInfoData = JSON.parse(savedData);
      } else {
        this.customerInfoData = this.customerInfoData;
      }
    }
    refresh(){
      window.location.reload()
    }
    download(){
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.customerInfoData); // Converting JSON data to sheet
      const workbook: XLSX.WorkBook = {
        Sheets: { 'data': worksheet },
        SheetNames: ['data'],
      };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
      // Save the Excel file
      const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(data, 'CustomerInformation.xlsx');    
    }

      addWarehousedata(newUser:any){
      if (newUser) {
        const lastNum =
          this.customerInfoData.length > 0
            ? Math.max(
                ...this.customerInfoData.map(
                  (item: { number: string | number }) => +item.number
                )
              )
            : 0;
        const customerInfoData = {
          number: lastNum + 1,
          userName: newUser['userName'],
          city: newUser['city'],
          manager: newUser['manager'],
          email: newUser['email'],
          contactTelephone: newUser['contactTelephone'],
          creator: newUser['creator'],
          createTime: newUser['createTime'],
          lastUpdateTime: newUser['lastUpdateTime'],
        };
        this.customerInfoData.push(customerInfoData);
        this.customerInfoData = [...this.customerInfoData];
  
        this.saveData();
      } else {
        console.log('Data not added');
      }
    }
  
    openDialog(): void {
      const dialogRef = this._dialog.open(AddCustomerInfoDiaglogComponent, {
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
      const index = this.customerInfoData.findIndex(
        (row: any) => row === selectedRow
      );
      if (index !== -1) {
        this.customerInfoData[index] = {
          ...updatedData,
          number: selectedRow.number,
        };
        this.customerInfoData = [...this.customerInfoData];
        this.saveData();
        this.cdr.detectChanges();
      }
    }
    openEditDialog(selectedRow: any): void {
      const dialogRef = this._dialog.open(EditCustomerInfoDiaglogComponent, {
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
      const index = this.customerInfoData.findIndex(
        (item: { number: any }) => item.number === row.number
      );
      this.customerInfoData.splice(index, 1);
      this.customerInfoData = [...this.customerInfoData];
      console.log('deleted ROW: ', index, this.customerInfoData);
      this.saveData();
      this.cdr.detectChanges();
    }
  
    openDeleteDialog(row: any) {
      const dialogRef = this._dialog.open(DeleteCustomerInfoDiaglogComponent, {
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
      localStorage.setItem('customerInfoData', JSON.stringify(this.customerInfoData));
    }

}
