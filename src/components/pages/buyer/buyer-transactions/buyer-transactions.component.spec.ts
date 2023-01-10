import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerTransactionsComponent } from './buyer-transactions.component';

describe('BuyerTransactionsComponent', () => {
  let component: BuyerTransactionsComponent;
  let fixture: ComponentFixture<BuyerTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
