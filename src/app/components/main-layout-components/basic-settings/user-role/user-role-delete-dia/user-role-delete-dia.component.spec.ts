import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleDeleteDiaComponent } from './user-role-delete-dia.component';

describe('UserRoleDeleteDiaComponent', () => {
  let component: UserRoleDeleteDiaComponent;
  let fixture: ComponentFixture<UserRoleDeleteDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleDeleteDiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleDeleteDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
