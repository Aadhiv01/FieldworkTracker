import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalhourspageComponent } from './totalhourspage.component';

describe('TotalhourspageComponent', () => {
  let component: TotalhourspageComponent;
  let fixture: ComponentFixture<TotalhourspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalhourspageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalhourspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
