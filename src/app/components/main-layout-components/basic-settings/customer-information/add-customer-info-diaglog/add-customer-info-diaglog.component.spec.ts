import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerInfoDiaglogComponent } from './add-customer-info-diaglog.component';

describe('AddCustomerInfoDiaglogComponent', () => {
  let component: AddCustomerInfoDiaglogComponent;
  let fixture: ComponentFixture<AddCustomerInfoDiaglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomerInfoDiaglogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerInfoDiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
