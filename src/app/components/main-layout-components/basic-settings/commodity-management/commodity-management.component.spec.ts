import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityManagementComponent } from './commodity-management.component';

describe('CommodityManagementComponent', () => {
  let component: CommodityManagementComponent;
  let fixture: ComponentFixture<CommodityManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommodityManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommodityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
