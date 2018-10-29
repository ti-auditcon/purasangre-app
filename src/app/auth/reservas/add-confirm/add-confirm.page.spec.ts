import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConfirmPage } from './add-confirm.page';

describe('AddConfirmPage', () => {
  let component: AddConfirmPage;
  let fixture: ComponentFixture<AddConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConfirmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
