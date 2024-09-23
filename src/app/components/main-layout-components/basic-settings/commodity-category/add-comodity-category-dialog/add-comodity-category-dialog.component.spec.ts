import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComodityCategoryDialogComponent } from './add-comodity-category-dialog.component';

describe('AddComodityCategoryDialogComponent', () => {
  let component: AddComodityCategoryDialogComponent;
  let fixture: ComponentFixture<AddComodityCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddComodityCategoryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddComodityCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
