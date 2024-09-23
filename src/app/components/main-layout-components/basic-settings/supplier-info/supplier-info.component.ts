import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MiniTableComponent } from '../../shared/mini-table/mini-table.component';
import { ToasterService } from '../../../services/toaster.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogSuppInfoComponent } from './delete-dialog-supp-info/delete-dialog-supp-info.component';
import { EditDialogSuppInfoComponent } from './edit-dialog-supp-info/edit-dialog-supp-info.component';
import { AddDialogSuppInfoComponent } from './add-dialog-supp-info/add-dialog-supp-info.component';
import * as XLSX from 'xlsx'; // For XLSX
import { saveAs } from 'file-saver'; // For file-saver

@Component({
  selector: 'app-supplier-info',
  standalone: true,
  imports: [MiniTableComponent, MatCardModule],
  templateUrl: './supplier-info.component.html',
  styleUrl: './supplier-info.component.scss',
})
export class SupplierInfoComponent implements OnInit {
  displayedColumns = [
    'number',
    'userName',
    'city',
    'address',
    'manager',
    'email',
    'contactTelephone',
    'creator',
    'createTime',
    'lastUpdateTime',
  ];
  columnTranslationMap = {
    number: 'number',
    userName: 'supplierName',
    city: 'city',
    address: 'detailedAddress',
    manager: 'manager',
    email: 'contactInformation',
    contactTelephone: 'contactInformation',
    creator: 'creator',
    createTime: 'createTime',
    lastUpdateTime: 'lastUpdateTime',
  };
  userSupplierInfo: any[] = [
    {
      number: 1,
      userName: 'Supplier 1',
      city: 'City 1',
      address: 'Address 1',
      manager: 'Manager 1',
      email: 'Email 1',
      contactTelephone: 'ContactTelephone 1',
      creator: 'Creator 1',
      createTime: 'CreateTime 1',
      lastUpdateTime: 'LastUpdateTime 1',
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
  inputForm = [{ label: 'supplierName', placeholder: 'Name' }];
  constructor(
    private _dialog: MatDialog,
    private toaster: ToasterService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    const savedData = localStorage.getItem('userSupplierInfo');
    if (savedData) {
      this.userSupplierInfo = JSON.parse(savedData);
    } else {
      this.userSupplierInfo = this.userSupplierInfo;
    }
  }
  refresh() {
    window.location.reload();
  }
  download() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.userSupplierInfo); // Converting JSON data to sheet
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the Excel file
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'User-Supplier-Information.xlsx'); 
  }
  addSupplierInfo(newData: any) {
    if (newData) {
      const lastNum =
        this.userSupplierInfo.length > 0
          ? Math.max(
              ...this.userSupplierInfo.map(
                (item: { number: string | number }) => +item.number
              )
            )
          : 0;
      const newSupplierData = {
        number: (lastNum + 1).toString(), // Auto-increment the row number
        userName: newData['userName'],
        city: newData['city'],
        address: newData['address'],
        manager: newData['manager'],
        email: newData['email'],
        contactTelephone: newData['contactTelephone'],
        creator: newData['creator'],
        createTime: newData['createTime'],
        lastUpdateTime: newData['lastUpdateTime'],
      };
      this.userSupplierInfo.push(newSupplierData);
      this.userSupplierInfo = [...this.userSupplierInfo];
      this.saveData();
    } else {
      console.log('No data provided');
    }
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(AddDialogSuppInfoComponent, {
      width: '450px',
      height: '600px',
      disableClose: true,
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.addSupplierInfo(result);
        this.toaster.addedSnackBar();
      } else {
        console.log('dialog closed without Data!!');
      }
    });
  }

  updatedRow(selectedRow: any, updatedData: any) {
    const index = this.userSupplierInfo.findIndex(
      (row: any) => row === selectedRow
    );
    if (index !== -1) {
      this.userSupplierInfo[index] = { ...updatedData, num: selectedRow.num };
      this.userSupplierInfo = [...this.userSupplierInfo];
      this.saveData();
      this.cdr.detectChanges();
    }
  }

  openEditDialog(selectedRow: any): void {
    const dialogRef = this._dialog.open(EditDialogSuppInfoComponent, {
      width: '450px',
      height: '600px',
      disableClose: true,
      data: selectedRow,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Update the row or handle the result here
        this.updatedRow(selectedRow, result);
        this.toaster.editSnackBar();
      } else {
        console.log('Dialog closed without Data!!');
      }
    });
  }

  deleteRow(row: any): void {
    const index = this.userSupplierInfo.findIndex(
      (item: { num: any }) => item.num === row.num
    );
    this.userSupplierInfo.splice(index, 1);
    this.userSupplierInfo = [...this.userSupplierInfo];
    console.log('deleted ROW: ', index, this.userSupplierInfo);
    this.saveData();
    this.cdr.detectChanges();
  }

  openDeleteDialog(row: any) {
    const dialogRef = this._dialog.open(DeleteDialogSuppInfoComponent, {
      width: '450px',
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
    localStorage.setItem(
      'userSupplierInfo',
      JSON.stringify(this.userSupplierInfo)
    );
  }
}
