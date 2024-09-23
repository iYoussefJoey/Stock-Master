import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComodManagmentDialogComponent } from './add-comod-managment-dialog.component';

describe('AddComodManagmentDialogComponent', () => {
  let component: AddComodManagmentDialogComponent;
  let fixture: ComponentFixture<AddComodManagmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddComodManagmentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddComodManagmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
