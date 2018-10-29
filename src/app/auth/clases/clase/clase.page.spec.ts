import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasePage } from './clase.page';

describe('ClasePage', () => {
  let component: ClasePage;
  let fixture: ComponentFixture<ClasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
