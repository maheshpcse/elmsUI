import { TestBed } from '@angular/core/testing';

import { EmployeeSettingsService } from './employee-settings.service';

describe('EmployeeSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeSettingsService = TestBed.get(EmployeeSettingsService);
    expect(service).toBeTruthy();
  });
});
