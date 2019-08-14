import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPaymentPage } from './plan-payment.page';

describe('PlanPaymentPage', () => {
  let component: PlanPaymentPage;
  let fixture: ComponentFixture<PlanPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanPaymentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
