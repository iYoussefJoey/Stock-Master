import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReceivingManageDiaglogComponent } from './edit-receiving-manage-diaglog.component';

describe('EditReceivingManageDiaglogComponent', () => {
  let component: EditReceivingManageDiaglogComponent;
  let fixture: ComponentFixture<EditReceivingManageDiaglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditReceivingManageDiaglogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReceivingManageDiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
