import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCustomerInfoDiaglogComponent } from './delete-customer-info-diaglog.component';

describe('DeleteCustomerInfoDiaglogComponent', () => {
  let component: DeleteCustomerInfoDiaglogComponent;
  let fixture: ComponentFixture<DeleteCustomerInfoDiaglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCustomerInfoDiaglogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCustomerInfoDiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
