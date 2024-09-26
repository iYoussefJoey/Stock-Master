import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingStatisticsComponent } from './receiving-statistics.component';

describe('ReceivingStatisticsComponent', () => {
  let component: ReceivingStatisticsComponent;
  let fixture: ComponentFixture<ReceivingStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivingStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivingStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
