import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightSettingComponent } from './freight-setting.component';

describe('FreightSettingComponent', () => {
  let component: FreightSettingComponent;
  let fixture: ComponentFixture<FreightSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreightSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreightSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
