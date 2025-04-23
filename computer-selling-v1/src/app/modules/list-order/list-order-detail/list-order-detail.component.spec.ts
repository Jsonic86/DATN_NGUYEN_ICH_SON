import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderDetailComponent } from './list-order-detail.component';

describe('ListOrderDetailComponent', () => {
  let component: ListOrderDetailComponent;
  let fixture: ComponentFixture<ListOrderDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOrderDetailComponent]
    });
    fixture = TestBed.createComponent(ListOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
