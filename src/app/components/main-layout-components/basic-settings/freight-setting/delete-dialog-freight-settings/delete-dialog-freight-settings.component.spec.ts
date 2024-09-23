import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogFreightSettingsComponent } from './delete-dialog-freight-settings.component';

describe('DeleteDialogFreightSettingsComponent', () => {
  let component: DeleteDialogFreightSettingsComponent;
  let fixture: ComponentFixture<DeleteDialogFreightSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDialogFreightSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDialogFreightSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
