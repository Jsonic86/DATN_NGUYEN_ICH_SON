import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentSupportComponent } from './installment-support.component';

describe('InstallmentSupportComponent', () => {
  let component: InstallmentSupportComponent;
  let fixture: ComponentFixture<InstallmentSupportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstallmentSupportComponent]
    });
    fixture = TestBed.createComponent(InstallmentSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
