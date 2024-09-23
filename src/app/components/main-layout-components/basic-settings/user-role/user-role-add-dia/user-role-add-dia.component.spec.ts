import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleAddDiaComponent } from './user-role-add-dia.component';

describe('UserRoleAddDiaComponent', () => {
  let component: UserRoleAddDiaComponent;
  let fixture: ComponentFixture<UserRoleAddDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleAddDiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleAddDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
