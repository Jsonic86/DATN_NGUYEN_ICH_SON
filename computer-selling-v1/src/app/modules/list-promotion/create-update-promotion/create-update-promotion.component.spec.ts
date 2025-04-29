import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePromotionComponent } from './create-update-promotion.component';

describe('CreateUpdatePromotionComponent', () => {
  let component: CreateUpdatePromotionComponent;
  let fixture: ComponentFixture<CreateUpdatePromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdatePromotionComponent]
    });
    fixture = TestBed.createComponent(CreateUpdatePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
