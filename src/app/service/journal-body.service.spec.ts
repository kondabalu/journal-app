import { TestBed } from '@angular/core/testing';

import { JournalBodyService } from './journal-body.service';

describe('JournalBodyService', () => {
  let service: JournalBodyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalBodyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
