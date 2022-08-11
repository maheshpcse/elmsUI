import { TestBed } from '@angular/core/testing';

import { AdminSettingsApisService } from './admin-settings-apis.service';

describe('AdminSettingsApisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminSettingsApisService = TestBed.get(AdminSettingsApisService);
    expect(service).toBeTruthy();
  });
});
