import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDialogSuppInfoComponent } from './add-dialog-supp-info.component';

describe('AddDialogSuppInfoComponent', () => {
  let component: AddDialogSuppInfoComponent;
  let fixture: ComponentFixture<AddDialogSuppInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDialogSuppInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDialogSuppInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
