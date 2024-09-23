import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComodityCategoryDialogComponent } from './edit-comodity-category-dialog.component';

describe('EditComodityCategoryDialogComponent', () => {
  let component: EditComodityCategoryDialogComponent;
  let fixture: ComponentFixture<EditComodityCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditComodityCategoryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComodityCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
