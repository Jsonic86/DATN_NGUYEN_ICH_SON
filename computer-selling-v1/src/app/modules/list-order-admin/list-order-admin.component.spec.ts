import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderAdminComponent } from './list-order-admin.component';

describe('ListOrderAdminComponent', () => {
  let component: ListOrderAdminComponent;
  let fixture: ComponentFixture<ListOrderAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOrderAdminComponent]
    });
    fixture = TestBed.createComponent(ListOrderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
