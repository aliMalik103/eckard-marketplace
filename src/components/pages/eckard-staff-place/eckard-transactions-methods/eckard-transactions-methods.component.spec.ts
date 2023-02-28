import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EckardTransactionsMethodsComponent } from './eckard-transactions-methods.component';

describe('EckardTransactionsMethodsComponent', () => {
  let component: EckardTransactionsMethodsComponent;
  let fixture: ComponentFixture<EckardTransactionsMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EckardTransactionsMethodsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EckardTransactionsMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
