import { ChangeDetectorRef, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MiniTableComponent } from '../../shared/mini-table/mini-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../../services/toaster.service';
import * as XLSX from 'xlsx'; // For XLSX
import { saveAs } from 'file-saver'; // For file-saver
@Component({
  selector: 'app-shipment-statistics',
  standalone: true,
  imports: [MiniTableComponent, MatCardModule,ReactiveFormsModule],
  templateUrl: './shipment-statistics.component.html',
  styleUrl: './shipment-statistics.component.scss'
})
export class ShipmentStatisticsComponent {
  displayedColumns = [
    'number',
    'shipmentNumber',
    'warehouseName',
    'locationCode',
    'commodityCode',
    'commodityName',
    'specificationCode',
    'specificationName',
    'customerName',
    'serialNumber',
    'deliveryQuantity',
    'deliveryTime',
    'commodityPrice',
    'expirationDate',
    'listingDate',
  ];
  columnTranslationMap: { [key: string]: string } = {
    'number': 'number',
    'shipmentNumber': 'shipmentNumber',
    'warehouseName': 'warehouseName',
    'locationCode': 'locationCode',
    'commodityCode': 'commodityCode',
    'commodityName': 'commodityName',
    'specificationCode': 'specificationCode',
    'specificationName': 'specificationName',
    'customerName': 'customerName',
    'serialNumber': 'serialNumber',
    'deliveryQuantity': 'deliveryQuantity',
    'deliveryTime': 'deliveryTime',
    'commodityPrice': 'commodityPrice',
    'expirationDate': 'expirationDate',
    'listingDate': 'listingDate',

  };
  stockManagmentData:  any[] = [
    // {
    // 'number': 'number',
    // 'shipmentNumber': 'shipmentNumber',
    // 'warehouseName': 'warehouseName',
    // 'locationCode': 'locationCode',
    // 'commodityCode': 'commodityCode',
    // 'commodityName': 'commodityName',
    // 'specificationCode': 'specificationCode',
    // 'specificationName': 'specificationName',
    // 'customerName': 'customerName',
    // 'serialNumber': 'serialNumber',
    // 'deliveryQuantity': 'deliveryQuantity',
    // 'deliveryTime': 'deliveryTime',
    // 'commodityPrice': 'commodityPrice',
    // 'expirationDate': 'expirationDate',
    // 'listingDate': 'listingDate',

  // }
]
 

  actionButtons = [
    // {
    //   label: 'edit',
    //   color: 'primary',
    //   action: (element: any) => {
    //     this.openEditDialog(element);
    //   },
    // },
    // {
    //   label: 'delete',
    //   color: 'warn',
    //   action: (element: any) => {
    //     this.openDeleteDialog(element);
    //   },
    // },
  ];
  actionButtonsAboveTable = [
    {
      label: 'refresh',
      action: () => this.refresh(),
    },
    {
      label: 'ios_share',
      action: () => this.download(),
    },
    {
      label: 'settings',
      action: () => this.refresh(),
    },
    {
      label: 'bar_chart_4_bars',
      action: () => this.download(),
    },
  ];
  inputForm =[
    {
    label: 'specificationCode',
    placeholder: 'specificationCode',
  },
    {
    label: 'warehouseName',
    placeholder: 'warehouseName',
  },
    {
    label: 'customerName',
    placeholder: 'customerName',
  },
]
  constructor(
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toaster:ToasterService
  ) {

  }
  
    
  ngOnInit(): void {
    const savedData = localStorage.getItem('stockManagmentData');
    if (savedData) {
      this.stockManagmentData = JSON.parse(savedData);
    } else {
      this.stockManagmentData = this.stockManagmentData;
    }
  }
  addNewRow(newData: any): void {
    if (newData) {
      const lastNum =
        this.stockManagmentData.length > 0
          ? Math.max(...this.stockManagmentData.map((item: { num: string | number; }) => +item.num))
          : 0;
      const newCompanyData = {
        num: (lastNum + 1).toString(), // Auto-increment the row number
        'Corporate Name': newData['Corporate Name'],
        City: newData['City'],
        'Detailed Address': newData['Detailed Address'],
        'Person in Charge': newData['Person in Charge'],
        'contact Information': newData['contact Information'],
      };
      this.stockManagmentData.push(newCompanyData);
      this.stockManagmentData = [...this.stockManagmentData];
      this.saveData();
    } else {
      console.log('No data provided');
    }
  }
  refresh(): void {
    window.location.reload();
  }
  download(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.stockManagmentData); // Converting JSON data to sheet
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the Excel file
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'stock-Managament.xlsx'); 
  }
  saveData(): void {
    localStorage.setItem('stockManagmentData', JSON.stringify(this.stockManagmentData));
  }




  openDialog(): void {
    // const dialogRef = this._dialog.open(CompanyDialogComponent, {
    //   width: '450px',
    //   height: '600px',
    //   disableClose: true,
    //   data: {},
    // });
    // dialogRef.afterClosed().subscribe((result: any) => {
    //   if (result) {
    //     this.addNewRow(result);
    //     this.toaster.addedSnackBar()
    //   } else {
    //     console.log('dialog closed without Data!!');
    //   }
    // });
  }

  updatedRow(selectedRow:any , updatedData:any){
    const index = this.stockManagmentData.findIndex((row:any) => row === selectedRow)
    if(index !== -1 ){
      this.stockManagmentData[index] = {...updatedData, num: selectedRow.num}
      this.stockManagmentData = [...this.stockManagmentData]
      this.saveData()
      this.cdr.detectChanges()
    }
  }

  openEditDialog(selectedRow:any): void {
    // const dialogRef = this._dialog.open(EditDialogComponent, {
    //   width: '450px',
    //   height: '600px',
    //   disableClose: true,
    //   data: selectedRow,
    // });
    // dialogRef.afterClosed().subscribe((result: any) => {
    //   if (result) {
    //     // Update the row or handle the result here
    //     this.updatedRow(selectedRow, result);
    //     this.toaster.editSnackBar()
    //   } else {
    //     console.log('Dialog closed without Data!!');
    //   }
    // });
  }




  deleteRow(row: any): void {
    const index = this.stockManagmentData.findIndex((item: { num: any; }) => item.num === row.num);
    this.stockManagmentData.splice(index, 1);
    this.stockManagmentData = [...this.stockManagmentData];
    console.log('deleted ROW: ', index, this.stockManagmentData);
    this.saveData();
    this.cdr.detectChanges();
  }






  openDeleteDialog(row: any) {
  //   const dialogRef = this._dialog.open(DeleteDialogComponent, {
  //     width: '450px',
  //     disableClose: true,
  //     data: row,
  //   });
  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     if (result) {
  //       this.deleteRow(row);
  //       this.toaster.deletedSnackBar()
  //       console.log('Selected row is deleted and dialog is closed');
  //     }
  //   });
   }
}
