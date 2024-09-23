import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualWarehouseComponent } from './visual-warehouse.component';

describe('VisualWarehouseComponent', () => {
  let component: VisualWarehouseComponent;
  let fixture: ComponentFixture<VisualWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualWarehouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
