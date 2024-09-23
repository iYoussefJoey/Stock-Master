import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TranslatePipe } from '../../../pipe/translate.pipe';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mini-table',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './mini-table.component.html',
  styleUrl: './mini-table.component.scss',
})
export class MiniTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: any[] = []; // Data passed from the parent component
  @Input() displayedColumns: string[] = [];
  @Input() columnTranslationMap: { [key: string]: string } = {}; // Translation map input
  @Input() actionButtons: {
    color: string;
    label: string;
    action: (element: any) => void;
  }[] = [];
  @Input() actionButtonsAboveTable: {
    label: string;
    action: (element: any) => void;
  }[] = [];
  @Input() inputForm: { label: string; placeholder: string }[] = [];
  @Input() dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private langChangeSubscription!: Subscription;
  searchCriteria: { [key: string]: string } = {};

  constructor(private translationservice: TranslateService) {}
  ngOnInit(): void {
    this.dataSource.data = this.data;
    this.langChangeSubscription =
      this.translationservice.onLangChange.subscribe(() => {
        this.refreshTranslations();
      });
  }
  refreshTranslations(): void {
    // Reapply any necessary logic for language updates
    this.dataSource.data = [...this.data]; // This line can trigger re-rendering of the table
  }
  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe(); // Clean up subscription
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = changes['data'].currentValue;
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter() {
    // Filter the data based on the search criteria
    this.dataSource.data = this.data.filter((item) => {
      // Check all fields to match corresponding search criteria
      const matches = Object.keys(this.searchCriteria).every((key) => {
        const searchTerm = this.searchCriteria[key]?.toLowerCase() || '';
        if (!searchTerm) return true; // No search term means no filter on this field

        // Use placeholder to determine which data field to compare with
        if (key === 'Number') return item.userNumber.includes(searchTerm);
        if (key === 'Name') return item.userName.toLowerCase().includes(searchTerm)
        if (key === 'Role') return item.role.toLowerCase().includes(searchTerm);
        if (key === 'City') return item.city.toLowerCase().includes(searchTerm);
        if (key === 'departureCity') return item.departureCity.toLowerCase().includes(searchTerm);
        if (key === 'arrivalCity') return item.arrivalCity.toLowerCase().includes(searchTerm);
        if (key === 'OwnerName') return item.goodsOwnerName.toLowerCase().includes(searchTerm);
        if (key === 'formName') return item.formName.toLowerCase().includes(searchTerm);

        return true; // Default to true if no match is found (for flexibility)
      });

      return matches;
    });
  }

  onButtonClick(buttonAction: (element: any) => void, element: any): void {
    buttonAction(element);
  }
  onActionButtonClick(
    buttonAction: (element: any) => void,
    element: any
  ): void {
    buttonAction(element);
  }
}
