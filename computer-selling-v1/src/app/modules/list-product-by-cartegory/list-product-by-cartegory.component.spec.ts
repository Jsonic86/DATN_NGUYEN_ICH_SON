import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductByCartegoryComponent } from './list-product-by-cartegory.component';

describe('ListProductByCartegoryComponent', () => {
  let component: ListProductByCartegoryComponent;
  let fixture: ComponentFixture<ListProductByCartegoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProductByCartegoryComponent]
    });
    fixture = TestBed.createComponent(ListProductByCartegoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
