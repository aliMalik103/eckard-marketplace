import { TestBed } from '@angular/core/testing';

import { AddNewListingService } from './add-new-listing.service';

describe('AddNewListingService', () => {
  let service: AddNewListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
