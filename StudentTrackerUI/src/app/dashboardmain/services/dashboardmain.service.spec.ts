import { TestBed } from '@angular/core/testing';

import { DashboardmainService } from './dashboardmain.service';

describe('DashboardmainService', () => {
  let service: DashboardmainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardmainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
