import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementDeleteDiaComponent } from './user-management-delete-dia.component';

describe('UserManagementDeleteDiaComponent', () => {
  let component: UserManagementDeleteDiaComponent;
  let fixture: ComponentFixture<UserManagementDeleteDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementDeleteDiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementDeleteDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
