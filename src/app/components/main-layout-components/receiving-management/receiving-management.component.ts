import { ChangeDetectorRef, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import * as XLSX from 'xlsx'; // For XLSX
import { saveAs } from 'file-saver'; // For file-saver
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../services/toaster.service';
import { EditReceivingManageDiaglogComponent } from './edit-receiving-manage-diaglog/edit-receiving-manage-diaglog.component';
import { AddReceivingManageDiaglogComponent } from './add-receiving-manage-diaglog/add-receiving-manage-diaglog.component';
import { DeleteReceivingManageDiaglogComponent } from './delete-receiving-manage-diaglog/delete-receiving-manage-diaglog.component';
import { MatCardModule } from '@angular/material/card';
import { MiniTableComponent } from '../shared/mini-table/mini-table.component';
import { TranslatePipe } from '../../pipe/translate.pipe';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-receiving-management',
  standalone: true,
  imports: [MatTabsModule, MatIconModule,MatCardModule,MiniTableComponent,TranslatePipe,CommonModule],
  templateUrl: './receiving-management.component.html',
  styleUrl: './receiving-management.component.scss'
})
export class ReceivingManagementComponent {
  displayedColumns1 = [
    'number',
    'asnNumber',
    'batch',
    'goodsOwnerName',
    'estimatedTimeArrival',
  ];
  displayedColumns2 = [
    'number',
    'commodityCode',
    'tradeName',
    'specificationCode',
    'formName',
    'goodsOwnerName',
    'supplierName',
    'asnQuantity',
    'commodityPrice',
    'weight',
    'volume',
  ];
  displayedColumns3 = [
    'number',
    'commodityCode',
    'tradeName',
    'specificationCode',
    'formName',
    'goodsOwnerName',
    'supplierName',
    'asnQuantity',
    'commodityPrice',
    'weight',
    'volume',
  ];
  displayedColumns4 = [
    'number',
    'commodityCode',
    'tradeName',
    'specificationCode',
    'formName',
    'goodsOwnerName',
    'supplierName',
    'asnQuantity',
    'commodityPrice',
    'weight',
    'volume',
    'sortedQuantity',
  ];
  displayedColumns5 = [
    'number',
    'commodityCode',
    'tradeName',
    'specificationCode',
    'formName',
    'goodsOwnerName',
    'supplierName',
    'asnQuantity',
    'commodityPrice',
    'weight',
    'volume',
    'sortedQuantity',
    'actualQuantity',
  ];
  displayedColumns6 = [
    'number',
    'commodityCode',
    'tradeName',
    'specificationCode',
    'formName',
    'goodsOwnerName',
    'supplierName',
    'asnQuantity',
    'commodityPrice',
    'weight',
    'volume',
    'actualQuantity',
    'sortedQuantity',
    'shortageQuantity',
    'moreQuantity',
    'damageQuantity',
  ];
  columnTranslationMap = {
    number: 'number',
    asnNumber: 'asnNumber',
    userName: 'goodsOwnerName',
    contactInformation: 'contactInformation',
  };
  noticeOfArrival: any[] = [
    {
      number: 1,
      asnNumber: '001',
      batch: 'Admin',
      goodsOwnerName: 'Male',
      estimatedTimeArrival: '1234567890',
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
  actionButtonsAboveTable2 = [
    {
      label: 'refresh',
      action: () => this.refresh(),
    },
    {
      label: 'ios_share',
      action: () => this.download(),
    },
  ];
  inputForm = [
    {
      label: 'goodsOwnerName',
      placeholder:'OwnerName',
    },
    {
      label: 'formName',
      placeholder:'formName',
    }
  ]

  constructor(
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toaster: ToasterService
  ) {}
  ngOnInit(): void {
    const savedData = localStorage.getItem('noticeOfArrival');
    if (savedData) {
      this.noticeOfArrival = JSON.parse(savedData);
    } else {
      this.noticeOfArrival = this.noticeOfArrival;
    }
  }
  refresh() {
    window.location.reload();
  }
  download() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.noticeOfArrival); // Converting JSON data to sheet
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the Excel file
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Receiving-Management.xlsx'); 
   }
  addCommodityCategory(newUser: any): void {
    if (newUser) {
      const lastNum =
        this.noticeOfArrival.length > 0
          ? Math.max(
              ...this.noticeOfArrival.map(
                (item: { number: string | number }) => +item.number
              )
            )
          : 0;
      const newnoticeOfArrival = {
        number: lastNum + 1,
        asnNumber: newUser['asnNumber'],
        batch: newUser['batch'],
        goodsOwnerName: newUser['goodsOwnerName'],
        estimatedTimeArrival: newUser['estimatedTimeArrival'],
      };
      this.noticeOfArrival.push(newnoticeOfArrival);
      this.noticeOfArrival = [...this.noticeOfArrival];

      this.saveData();
    } else {
      console.log('Data not added');
    }
  }
  openDialog(): void {
    const dialogRef = this._dialog.open(AddReceivingManageDiaglogComponent, {
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
    const index = this.noticeOfArrival.findIndex(
      (row: any) => row === selectedRow
    );
    if (index !== -1) {
      this.noticeOfArrival[index] = {
        ...updatedData,
        number: selectedRow.number,
      };
      this.noticeOfArrival = [...this.noticeOfArrival];
      this.saveData();
      this.cdr.detectChanges();
    }
  }
  openEditDialog(selectedRow: any): void {
    const dialogRef = this._dialog.open(EditReceivingManageDiaglogComponent, {
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
    const index = this.noticeOfArrival.findIndex(
      (item: { number: any }) => item.number === row.number
    );
    this.noticeOfArrival.splice(index, 1);
    this.noticeOfArrival = [...this.noticeOfArrival];
    this.saveData();
    this.cdr.detectChanges();
  }

  openDeleteDialog(row: any) {
    const dialogRef = this._dialog.open(DeleteReceivingManageDiaglogComponent, {
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
    localStorage.setItem('noticeOfArrival', JSON.stringify(this.noticeOfArrival));
  }
}