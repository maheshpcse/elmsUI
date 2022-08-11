import { TestBed } from '@angular/core/testing';

import { AdminDashboardApisService } from './admin-dashboard-apis.service';

describe('AdminDashboardApisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminDashboardApisService = TestBed.get(AdminDashboardApisService);
    expect(service).toBeTruthy();
  });
});
