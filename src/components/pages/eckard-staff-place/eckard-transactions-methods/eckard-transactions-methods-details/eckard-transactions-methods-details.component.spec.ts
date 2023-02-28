import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EckardTransactionsMethodsDetailsComponent } from './eckard-transactions-methods-details.component';

describe('EckardTransactionsMethodsDetailsComponent', () => {
  let component: EckardTransactionsMethodsDetailsComponent;
  let fixture: ComponentFixture<EckardTransactionsMethodsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EckardTransactionsMethodsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EckardTransactionsMethodsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
