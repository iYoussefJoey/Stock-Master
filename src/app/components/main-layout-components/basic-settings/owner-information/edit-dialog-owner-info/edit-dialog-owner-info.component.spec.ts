import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogOwnerInfoComponent } from './edit-dialog-owner-info.component';

describe('EditDialogOwnerInfoComponent', () => {
  let component: EditDialogOwnerInfoComponent;
  let fixture: ComponentFixture<EditDialogOwnerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDialogOwnerInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDialogOwnerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
