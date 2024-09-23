import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingManagementComponent } from './receiving-management.component';

describe('ReceivingManagementComponent', () => {
  let component: ReceivingManagementComponent;
  let fixture: ComponentFixture<ReceivingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivingManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
