import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentStatisticsComponent } from './shipment-statistics.component';

describe('ShipmentStatisticsComponent', () => {
  let component: ShipmentStatisticsComponent;
  let fixture: ComponentFixture<ShipmentStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
