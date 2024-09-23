import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerInfoDiaglogComponent } from './edit-customer-info-diaglog.component';

describe('EditCustomerInfoDiaglogComponent', () => {
  let component: EditCustomerInfoDiaglogComponent;
  let fixture: ComponentFixture<EditCustomerInfoDiaglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCustomerInfoDiaglogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCustomerInfoDiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
