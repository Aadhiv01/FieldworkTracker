import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsummaryComponent } from './monthsummary.component';

describe('MonthsummaryComponent', () => {
  let component: MonthsummaryComponent;
  let fixture: ComponentFixture<MonthsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthsummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
