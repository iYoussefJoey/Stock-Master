import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDialogFreightSettingsComponent } from './add-dialog-freight-settings.component';

describe('AddDialogFreightSettingsComponent', () => {
  let component: AddDialogFreightSettingsComponent;
  let fixture: ComponentFixture<AddDialogFreightSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDialogFreightSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDialogFreightSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
