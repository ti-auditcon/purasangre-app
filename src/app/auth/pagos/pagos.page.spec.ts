import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosPage } from './pagos.page';

describe('PagosPage', () => {
  let component: PagosPage;
  let fixture: ComponentFixture<PagosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PagosPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
