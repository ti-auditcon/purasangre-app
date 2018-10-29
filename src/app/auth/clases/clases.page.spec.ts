import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesPage } from './clases.page';

describe('AboutPage', () => {
  let component: ClasesPage;
  let fixture: ComponentFixture<ClasesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClasesPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
