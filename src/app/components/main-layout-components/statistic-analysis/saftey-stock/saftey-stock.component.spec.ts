import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafteyStockComponent } from './saftey-stock.component';

describe('SafteyStockComponent', () => {
  let component: SafteyStockComponent;
  let fixture: ComponentFixture<SafteyStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafteyStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafteyStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
