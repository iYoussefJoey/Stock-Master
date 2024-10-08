import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseSettingComponent } from './warehouse-setting.component';

describe('WarehouseSettingComponent', () => {
  let component: WarehouseSettingComponent;
  let fixture: ComponentFixture<WarehouseSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
