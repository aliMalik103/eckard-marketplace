import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTractsTabComponent } from './add-tracts-tab.component';

describe('AddTractsTabComponent', () => {
  let component: AddTractsTabComponent;
  let fixture: ComponentFixture<AddTractsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTractsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTractsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
