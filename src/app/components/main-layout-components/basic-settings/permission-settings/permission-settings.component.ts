import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../pipe/translate.pipe';
const Adminstrator: any[] = [{ ['name']: 'Adminstrator' }];
@Component({
  selector: 'app-permission-settings',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  standalone: true,
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './permission-settings.component.html',
  styleUrl: './permission-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionSettingsComponent implements OnInit {
  readonly panelOpenState = signal(false);
  data: any;
  leftDataSource = Adminstrator;
  leftDisplayedColumns = ['name'];
  columnsToDisplay = ['menuName', 'operate'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;
  ngOnInit(): void {}

  dataSource = [
    { menuName: 'Company Information', operate: 'edit' },
    { menuName: 'Receiving Management', operate: 'edit' },
    { menuName: 'User Role', operate: 'edit' },
    { menuName: 'Permission Settings', operate: 'edit' },
    { menuName: 'Stock Management', operate: 'edit' },
    { menuName: 'Saftey Stock', operate: 'edit' },
    { menuName: 'User Management', operate: 'edit' },
    { menuName: 'Warehouse Processing', operate: 'edit' },
    { menuName: 'Reciving statics', operate: 'edit' },
    { menuName: 'Commodity ctegory', operate: 'edit' },
    { menuName: 'Delivery management', operate: 'edit' },
    { menuName: 'Inventory move', operate: 'edit' },
    { menuName: 'Shipment statistics', operate: 'edit' },
    // Add more menu items here...
  ];
}
