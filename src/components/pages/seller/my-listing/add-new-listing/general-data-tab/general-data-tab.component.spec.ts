import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDataTabComponent } from './general-data-tab.component';

describe('GeneralDataTabComponent', () => {
  let component: GeneralDataTabComponent;
  let fixture: ComponentFixture<GeneralDataTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralDataTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralDataTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
