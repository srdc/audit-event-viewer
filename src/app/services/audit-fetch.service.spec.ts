import { TestBed, inject } from '@angular/core/testing';

import { AuditFetchService } from './audit-fetch.service';

describe('AuditFetchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuditFetchService]
    });
  });

  it('should ...', inject([AuditFetchService], (service: AuditFetchService) => {
    expect(service).toBeTruthy();
  }));
});
