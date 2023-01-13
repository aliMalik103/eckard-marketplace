import { TestBed } from '@angular/core/testing';

import { MyListingsService } from './my-listings.service';

describe('MyListingsService', () => {
  let service: MyListingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyListingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
