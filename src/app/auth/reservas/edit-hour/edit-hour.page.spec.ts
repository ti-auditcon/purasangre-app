import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHourPage } from './edit-hour.page';

describe('EditHourPage', () => {
  let component: EditHourPage;
  let fixture: ComponentFixture<EditHourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHourPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
