import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseWorkingComponent } from './warehouse-working.component';

describe('WarehouseWorkingComponent', () => {
  let component: WarehouseWorkingComponent;
  let fixture: ComponentFixture<WarehouseWorkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseWorkingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseWorkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
