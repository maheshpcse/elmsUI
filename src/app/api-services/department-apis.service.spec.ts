import { TestBed } from '@angular/core/testing';

import { DepartmentApisService } from './department-apis.service';

describe('DepartmentApisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartmentApisService = TestBed.get(DepartmentApisService);
    expect(service).toBeTruthy();
  });
});
