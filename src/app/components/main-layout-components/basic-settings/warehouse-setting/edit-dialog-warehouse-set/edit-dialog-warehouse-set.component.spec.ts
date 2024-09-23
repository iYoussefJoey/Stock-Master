import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogWarehouseSetComponent } from './edit-dialog-warehouse-set.component';

describe('EditDialogWarehouseSetComponent', () => {
  let component: EditDialogWarehouseSetComponent;
  let fixture: ComponentFixture<EditDialogWarehouseSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDialogWarehouseSetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDialogWarehouseSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
