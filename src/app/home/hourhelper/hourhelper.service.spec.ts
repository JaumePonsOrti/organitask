import { TestBed } from '@angular/core/testing';

import { HourhelperService } from './hourhelper.service';

describe('HourhelperService', () => {
  let service: HourhelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HourhelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
