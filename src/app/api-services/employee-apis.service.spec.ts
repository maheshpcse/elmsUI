import { TestBed } from '@angular/core/testing';

import { EmployeeApisService } from './employee-apis.service';

describe('EmployeeApisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeApisService = TestBed.get(EmployeeApisService);
    expect(service).toBeTruthy();
  });
});
