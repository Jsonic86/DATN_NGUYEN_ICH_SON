import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferentialPriceComponent } from './preferential-price.component';

describe('PreferentialPriceComponent', () => {
  let component: PreferentialPriceComponent;
  let fixture: ComponentFixture<PreferentialPriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreferentialPriceComponent]
    });
    fixture = TestBed.createComponent(PreferentialPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
