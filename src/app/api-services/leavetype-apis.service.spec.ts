import { TestBed } from '@angular/core/testing';

import { LeavetypeApisService } from './leavetype-apis.service';

describe('LeavetypeApisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeavetypeApisService = TestBed.get(LeavetypeApisService);
    expect(service).toBeTruthy();
  });
});
