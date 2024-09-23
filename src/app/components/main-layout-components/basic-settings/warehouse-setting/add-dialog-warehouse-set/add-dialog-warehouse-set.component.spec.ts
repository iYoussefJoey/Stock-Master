import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDialogWarehouseSetComponent } from './add-dialog-warehouse-set.component';

describe('AddDialogWarehouseSetComponent', () => {
  let component: AddDialogWarehouseSetComponent;
  let fixture: ComponentFixture<AddDialogWarehouseSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDialogWarehouseSetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDialogWarehouseSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
