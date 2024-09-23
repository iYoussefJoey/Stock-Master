import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReceivingManageDiaglogComponent } from './delete-receiving-manage-diaglog.component';

describe('DeleteReceivingManageDiaglogComponent', () => {
  let component: DeleteReceivingManageDiaglogComponent;
  let fixture: ComponentFixture<DeleteReceivingManageDiaglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteReceivingManageDiaglogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteReceivingManageDiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
