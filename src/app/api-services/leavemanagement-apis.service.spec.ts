import { TestBed } from '@angular/core/testing';

import { LeavemanagementApisService } from './leavemanagement-apis.service';

describe('LeavemanagementApisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeavemanagementApisService = TestBed.get(LeavemanagementApisService);
    expect(service).toBeTruthy();
  });
});
