import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkhoursComponent } from './bulkhours.component';

describe('BulkhoursComponent', () => {
  let component: BulkhoursComponent;
  let fixture: ComponentFixture<BulkhoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkhoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BulkhoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
