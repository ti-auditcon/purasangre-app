import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WodsPage } from './wods.page';

describe('WodsPage', () => {
  let component: WodsPage;
  let fixture: ComponentFixture<WodsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WodsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
