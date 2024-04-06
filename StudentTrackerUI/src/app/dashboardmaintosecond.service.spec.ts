import { TestBed } from '@angular/core/testing';

import { DashboardmaintosecondService } from './dashboardmaintosecond.service';

describe('DashboardmaintosecondService', () => {
  let service: DashboardmaintosecondService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardmaintosecondService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
