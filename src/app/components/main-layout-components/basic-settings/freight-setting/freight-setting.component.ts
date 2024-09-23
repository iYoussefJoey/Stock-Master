import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MiniTableComponent } from '../../shared/mini-table/mini-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../../services/toaster.service';
import { DeleteDialogFreightSettingsComponent } from './delete-dialog-freight-settings/delete-dialog-freight-settings.component';
import { EditDialogFreightSettingsComponent } from './edit-dialog-freight-settings/edit-dialog-freight-settings.component';
import { AddDialogFreightSettingsComponent } from './add-dialog-freight-settings/add-dialog-freight-settings.component';
import * as XLSX from 'xlsx'; // For XLSX
import { saveAs } from 'file-saver'; // For file-saver

@Component({
  selector: 'app-freight-setting',
  standalone: true,
  imports: [MiniTableComponent,MatCardModule],
  templateUrl: './freight-setting.component.html',
  styleUrl: './freight-setting.component.scss'
})
export class FreightSettingComponent implements OnInit{
  displayedColumns = [
    'number',
    'userName',
    'departureCity',
    'arrivalCity',
    'weightFee',
    'volumeFee',
    'minPayment',
    'creator',
    'createTime',
    'valid',
  ];
  columnTranslationMap ={
    'number': 'number',
    'userName': 'carrier',
    'departure City': 'departureCity',
    'arrival City': 'arrivalCity',
    'weight Fee': 'weightFee',
    'volume Fee': 'volumeFee',
    'min Payment': 'minPayment',
    'creator': 'creator',
    'createTime': 'createTime',
    'valid': 'valid',
  }
  freightSettingsUser:  any[] = [
    {
      'number': '001',
      'carrier': 'modric',
      'departureCity': 'rolo',
      'arrivalCity': '1234567890',
      'weightFee': '1234567890@qq.com',
      'volumeFee':'lal',
      'minPayment':'100k',
      'creator': '17/9/2024 00:00:00',
      'createTime': '17/9/2024 00:00:00',
      'valid': 'True',
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
    {label:'carrier',
      placeholder:'Name',
    },
 
    {label:'departureCity',
      placeholder:'departureCity',
    },
 
    {label:'arrivalCity',
      placeholder:'arrivalCity',
    },
 
  ]
  constructor( private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toaster: ToasterService){  }
  ngOnInit(): void {
    const savedData = localStorage.getItem('freightSettingsUser');
    if (savedData) {
      this.freightSettingsUser = JSON.parse(savedData);
    } else {
      this.freightSettingsUser = this.freightSettingsUser;
    }
  }
  refresh(){
    window.location.reload()
  }
  download(){
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.freightSettingsUser); // Converting JSON data to sheet
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the Excel file
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Freight-Settings.xlsx'); 
  }
  addWarehousedata(newUser:any){
    if (newUser) {
      const lastNum =
        this.freightSettingsUser.length > 0
          ? Math.max(
              ...this.freightSettingsUser.map(
                (item: { number: string | number }) => +item.number
              )
            )
          : 0;
      const freightSettingsUser = {
        number: lastNum + 1,
        userName: newUser['userName'],
        departureCity: newUser['departureCity'],
        arrivalCity: newUser['arrivalCity'],
        weightFee: newUser['weightFee'],
        volumeFee: newUser['volumeFee'],
        minPayment: newUser['minPayment'],
        creator: newUser['creator'],
        createTime: newUser['createTime'],
        valid: newUser['valid'],
      };
      this.freightSettingsUser.push(freightSettingsUser);
      this.freightSettingsUser = [...this.freightSettingsUser];

      this.saveData();
    } else {
      console.log('Data not added');
    }
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(AddDialogFreightSettingsComponent, {
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
    const index = this.freightSettingsUser.findIndex(
      (row: any) => row === selectedRow
    );
    if (index !== -1) {
      this.freightSettingsUser[index] = {
        ...updatedData,
        number: selectedRow.number,
      };
      this.freightSettingsUser = [...this.freightSettingsUser];
      this.saveData();
      this.cdr.detectChanges();
    }
  }
  openEditDialog(selectedRow: any): void {
    const dialogRef = this._dialog.open(EditDialogFreightSettingsComponent, {
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
    const index = this.freightSettingsUser.findIndex(
      (item: { number: any }) => item.number === row.number
    );
    this.freightSettingsUser.splice(index, 1);
    this.freightSettingsUser = [...this.freightSettingsUser];
    console.log('deleted ROW: ', index, this.freightSettingsUser);
    this.saveData();
    this.cdr.detectChanges();
  }

  openDeleteDialog(row: any) {
    const dialogRef = this._dialog.open(DeleteDialogFreightSettingsComponent, {
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
    localStorage.setItem('freightSettingsUser', JSON.stringify(this.freightSettingsUser));
  }
}
