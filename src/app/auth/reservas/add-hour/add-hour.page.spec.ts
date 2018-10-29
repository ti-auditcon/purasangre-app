import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHourPage } from './add-hour.page';

describe('AddHourPage', () => {
  let component: AddHourPage;
  let fixture: ComponentFixture<AddHourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHourPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
