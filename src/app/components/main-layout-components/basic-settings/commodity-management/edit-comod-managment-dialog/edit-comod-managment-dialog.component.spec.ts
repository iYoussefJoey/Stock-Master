import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComodManagmentDialogComponent } from './edit-comod-managment-dialog.component';

describe('EditComodManagmentDialogComponent', () => {
  let component: EditComodManagmentDialogComponent;
  let fixture: ComponentFixture<EditComodManagmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditComodManagmentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComodManagmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
