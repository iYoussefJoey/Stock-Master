import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogSuppInfoComponent } from './edit-dialog-supp-info.component';

describe('EditDialogSuppInfoComponent', () => {
  let component: EditDialogSuppInfoComponent;
  let fixture: ComponentFixture<EditDialogSuppInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDialogSuppInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDialogSuppInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
