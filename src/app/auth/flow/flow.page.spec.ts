import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowPage } from './flow.page';

describe('FlowPage', () => {
  let component: FlowPage;
  let fixture: ComponentFixture<FlowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
