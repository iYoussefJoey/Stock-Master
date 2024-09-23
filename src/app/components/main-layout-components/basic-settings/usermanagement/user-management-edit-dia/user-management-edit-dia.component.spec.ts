import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementEditDiaComponent } from './user-management-edit-dia.component';

describe('UserManagementEditDiaComponent', () => {
  let component: UserManagementEditDiaComponent;
  let fixture: ComponentFixture<UserManagementEditDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementEditDiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementEditDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
