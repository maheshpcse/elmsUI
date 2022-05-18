import { TestBed } from '@angular/core/testing';

import { AdminApisService } from './admin-apis.service';

describe('AdminApisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminApisService = TestBed.get(AdminApisService);
    expect(service).toBeTruthy();
  });
});
