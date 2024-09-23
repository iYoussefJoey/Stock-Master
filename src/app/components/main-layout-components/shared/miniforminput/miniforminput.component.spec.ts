import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniforminputComponent } from './miniforminput.component';

describe('MiniforminputComponent', () => {
  let component: MiniforminputComponent;
  let fixture: ComponentFixture<MiniforminputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniforminputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniforminputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
