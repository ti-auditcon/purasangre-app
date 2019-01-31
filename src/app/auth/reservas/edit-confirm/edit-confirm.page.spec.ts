import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfirmPage } from './edit-confirm.page';

describe('EditConfirmPage', () => {
  let component: EditConfirmPage;
  let fixture: ComponentFixture<EditConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConfirmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
