import { TestBed } from '@angular/core/testing';

import { LoginpageService } from './loginpage.service';

describe('LoginpageService', () => {
  let service: LoginpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
