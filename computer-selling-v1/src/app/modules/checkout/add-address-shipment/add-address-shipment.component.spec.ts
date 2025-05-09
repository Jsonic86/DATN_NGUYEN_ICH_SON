import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAddressShipmentComponent } from './add-address-shipment.component';

describe('AddAddressShipmentComponent', () => {
  let component: AddAddressShipmentComponent;
  let fixture: ComponentFixture<AddAddressShipmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAddressShipmentComponent]
    });
    fixture = TestBed.createComponent(AddAddressShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
