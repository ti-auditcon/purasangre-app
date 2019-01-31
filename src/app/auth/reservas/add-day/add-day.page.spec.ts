import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDayPage } from './add-day.page';

describe('AddDayPage', () => {
  let component: AddDayPage;
  let fixture: ComponentFixture<AddDayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
