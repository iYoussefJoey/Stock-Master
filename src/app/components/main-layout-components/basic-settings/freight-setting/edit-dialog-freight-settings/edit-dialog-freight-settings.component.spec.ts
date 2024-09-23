import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogFreightSettingsComponent } from './edit-dialog-freight-settings.component';

describe('EditDialogFreightSettingsComponent', () => {
  let component: EditDialogFreightSettingsComponent;
  let fixture: ComponentFixture<EditDialogFreightSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDialogFreightSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDialogFreightSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
