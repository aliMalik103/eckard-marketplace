import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerTransactionsComponent } from './seller-transactions.component';

describe('SellerTransactionsComponent', () => {
  let component: SellerTransactionsComponent;
  let fixture: ComponentFixture<SellerTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
