import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoyDashboardPage } from './hoydashboard.page';

describe('HoyDashboardPage', () => {
  let component: HoyDashboardPage;
  let fixture: ComponentFixture<HoyDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoyDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoyDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
