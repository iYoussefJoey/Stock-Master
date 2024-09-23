import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComodityCategoryDialogComponent } from './delete-comodity-category-dialog.component';

describe('DeleteComodityCategoryDialogComponent', () => {
  let component: DeleteComodityCategoryDialogComponent;
  let fixture: ComponentFixture<DeleteComodityCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteComodityCategoryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteComodityCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
