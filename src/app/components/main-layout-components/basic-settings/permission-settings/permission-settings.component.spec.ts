import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionSettingsComponent } from './permission-settings.component';

describe('PermissionSettingsComponent', () => {
  let component: PermissionSettingsComponent;
  let fixture: ComponentFixture<PermissionSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
