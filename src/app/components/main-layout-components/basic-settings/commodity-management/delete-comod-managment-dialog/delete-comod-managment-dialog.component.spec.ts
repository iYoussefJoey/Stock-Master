import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComodManagmentDialogComponent } from './delete-comod-managment-dialog.component';

describe('DeleteComodManagmentDialogComponent', () => {
  let component: DeleteComodManagmentDialogComponent;
  let fixture: ComponentFixture<DeleteComodManagmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteComodManagmentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteComodManagmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
