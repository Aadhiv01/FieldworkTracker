import { TestBed } from '@angular/core/testing';

import { ProfilepagemainService } from './profilepagemain.service';

describe('ProfilepagemainService', () => {
  let service: ProfilepagemainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilepagemainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
