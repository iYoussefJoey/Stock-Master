import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityCategoryComponent } from './commodity-category.component';

describe('CommodityCategoryComponent', () => {
  let component: CommodityCategoryComponent;
  let fixture: ComponentFixture<CommodityCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommodityCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommodityCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
