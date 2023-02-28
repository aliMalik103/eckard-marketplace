import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EckardTransactionsComponent } from './eckard-transactions.component';

describe('EckardTransactionsComponent', () => {
  let component: EckardTransactionsComponent;
  let fixture: ComponentFixture<EckardTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EckardTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EckardTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
