import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogSuppInfoComponent } from './delete-dialog-supp-info.component';

describe('DeleteDialogSuppInfoComponent', () => {
  let component: DeleteDialogSuppInfoComponent;
  let fixture: ComponentFixture<DeleteDialogSuppInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDialogSuppInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDialogSuppInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
