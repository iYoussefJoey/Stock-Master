import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDialogOwnerInfoComponent } from './add-dialog-owner-info.component';

describe('AddDialogOwnerInfoComponent', () => {
  let component: AddDialogOwnerInfoComponent;
  let fixture: ComponentFixture<AddDialogOwnerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDialogOwnerInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDialogOwnerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
