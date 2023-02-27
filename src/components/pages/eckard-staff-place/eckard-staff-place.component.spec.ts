import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EckardStaffPlaceComponent } from './eckard-staff-place.component';

describe('EckardStaffPlaceComponent', () => {
  let component: EckardStaffPlaceComponent;
  let fixture: ComponentFixture<EckardStaffPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EckardStaffPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EckardStaffPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
