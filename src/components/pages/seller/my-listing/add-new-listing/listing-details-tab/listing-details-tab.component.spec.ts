import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingDetailsTabComponent } from './listing-details-tab.component';

describe('ListingDetailsTabComponent', () => {
  let component: ListingDetailsTabComponent;
  let fixture: ComponentFixture<ListingDetailsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingDetailsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingDetailsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
