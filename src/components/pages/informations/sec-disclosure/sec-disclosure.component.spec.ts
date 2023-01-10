import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SECDisclosureComponent } from './sec-disclosure.component';

describe('SECDisclosureComponent', () => {
  let component: SECDisclosureComponent;
  let fixture: ComponentFixture<SECDisclosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SECDisclosureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SECDisclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
