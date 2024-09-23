import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogOwnerInfoComponent } from './delete-dialog-owner-info.component';

describe('DeleteDialogOwnerInfoComponent', () => {
  let component: DeleteDialogOwnerInfoComponent;
  let fixture: ComponentFixture<DeleteDialogOwnerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDialogOwnerInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDialogOwnerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
