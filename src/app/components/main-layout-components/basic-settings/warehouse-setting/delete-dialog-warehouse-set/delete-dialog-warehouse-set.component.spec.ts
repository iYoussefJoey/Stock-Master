import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogWarehouseSetComponent } from './delete-dialog-warehouse-set.component';

describe('DeleteDialogWarehouseSetComponent', () => {
  let component: DeleteDialogWarehouseSetComponent;
  let fixture: ComponentFixture<DeleteDialogWarehouseSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDialogWarehouseSetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDialogWarehouseSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
