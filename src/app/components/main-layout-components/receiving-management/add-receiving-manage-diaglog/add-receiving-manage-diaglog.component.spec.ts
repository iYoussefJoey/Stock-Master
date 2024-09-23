import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceivingManageDiaglogComponent } from './add-receiving-manage-diaglog.component';

describe('AddReceivingManageDiaglogComponent', () => {
  let component: AddReceivingManageDiaglogComponent;
  let fixture: ComponentFixture<AddReceivingManageDiaglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReceivingManageDiaglogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReceivingManageDiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
