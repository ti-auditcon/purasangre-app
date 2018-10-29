import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoyPage } from './hoy.page';

describe('HoyPage', () => {
  let component: HoyPage;
  let fixture: ComponentFixture<HoyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
