import { ChangeDetectorRef, Component } from '@angular/core';
import { UserRoleDeleteDiaComponent } from './user-role-delete-dia/user-role-delete-dia.component';
import { UserRoleEditDiaComponent } from './user-role-edit-dia/user-role-edit-dia.component';
import { UserRoleAddDiaComponent } from './user-role-add-dia/user-role-add-dia.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MiniTableComponent } from '../../shared/mini-table/mini-table.component';
import { ToasterService } from '../../../services/toaster.service';
import * as XLSX from 'xlsx'; // For XLSX
import { saveAs } from 'file-saver'; // For file-saver

@Component({
  selector: 'app-user-role',
  standalone: true,
  imports: [MatCardModule,MiniTableComponent],
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.scss'
})
export class UserRoleComponent {
  displayedColumns=['number','userRole','valid'];
  columnTranslationMap: { [key: string]: string } = {
    'number': 'number',
    'userRole': 'userRole',
    'valid': 'valid',
  };
  userData:any[]=[]
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
  refresh(): void {
    window.location.reload();
  }
  download(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.userData); // Converting JSON data to sheet
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the Excel file
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'User-Role-Information.xlsx'); 
  }
  constructor(private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toaster:ToasterService
  ){

  }
  ngOnInit(): void {
    const savedData = localStorage.getItem('UserData');
    if (savedData) {
      this.userData = JSON.parse(savedData);
    } else {
      this.userData = this.userData;
    }
    
  }
  

addNewUserRole(newUser:any){
  if (newUser && newUser['userRole'] && newUser['valid']) {

    const lastNum= this.userData.length > 0 ? Math.max(...this.userData.map((item: { number: string | number; }) => +item.number)) : 0
    const newUserData = {
      number:(lastNum + 1),
      'userRole':newUser['userRole'],
      valid: newUser['valid'] // Ensure 'valid' is included here
    }
    this.userData.push(newUserData)
    this.userData=[...this.userData]

    this.saveData()
  } else
  {
    console.log(('Data not added'))
  }
}


  openDialog(): void {
    const dialogRef = this._dialog.open(UserRoleAddDiaComponent, {
      width: '450px',
      height: '330px',
      disableClose: true,
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result['userRole'] && result['valid']) {
        this.addNewUserRole(result);
        this.toaster.addedSnackBar()
        console.log('The dialog was closed');
      } else {
        console.log('dialog closed without Data!!');
      }
    });
  }

  updatedRow(selectedRow:any , updatedData:any){
    const index = this.userData.findIndex((row:any) => row === selectedRow)
    if(index !== -1 ){
      this.userData[index] = {...updatedData, number: selectedRow.number}
      this.userData = [...this.userData]
      this.saveData()
      this.cdr.detectChanges()
    }
  }

  openEditDialog(selectedRow:any): void {
    const dialogRef = this._dialog.open(UserRoleEditDiaComponent, {
      width: '450px',
      height: '330px',
      disableClose: true,
      data: selectedRow,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Update the row or handle the result here
        this.updatedRow(selectedRow, result);
        this.toaster.editSnackBar()
        console.log('The dialog was closed');
      } else {
        console.log('Dialog closed without Data!!');
      }
    });
  }




  deleteRow(row: any): void {
    const index = this.userData.findIndex((item: { number: any; }) => item.number === row.number);
    this.userData.splice(index, 1);
    this.userData = [...this.userData];
    console.log('deleted ROW: ', index, this.userData);
    this.saveData();
    this.cdr.detectChanges();
  }






  openDeleteDialog(row: any) {
    const dialogRef = this._dialog.open(UserRoleDeleteDiaComponent, {
      width: '450px',
      height: '250px',
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
  saveData(): void {
    localStorage.setItem('UserData', JSON.stringify(this.userData));
  }

}
