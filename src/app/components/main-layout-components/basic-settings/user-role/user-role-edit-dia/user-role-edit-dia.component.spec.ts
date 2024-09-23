import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleEditDiaComponent } from './user-role-edit-dia.component';

describe('UserRoleEditDiaComponent', () => {
  let component: UserRoleEditDiaComponent;
  let fixture: ComponentFixture<UserRoleEditDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleEditDiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleEditDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
