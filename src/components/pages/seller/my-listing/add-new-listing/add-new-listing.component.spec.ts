import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewListingComponent } from './add-new-listing.component';

describe('AddNewListingComponent', () => {
  let component: AddNewListingComponent;
  let fixture: ComponentFixture<AddNewListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
