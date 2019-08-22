import { TestBed } from '@angular/core/testing';

import { DebitEntryService } from './debit-entry.service';

describe('DebitEntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DebitEntryService = TestBed.get(DebitEntryService);
    expect(service).toBeTruthy();
  });
});
