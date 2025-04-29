import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPromotionComponent } from './set-promotion.component';

describe('SetPromotionComponent', () => {
  let component: SetPromotionComponent;
  let fixture: ComponentFixture<SetPromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetPromotionComponent]
    });
    fixture = TestBed.createComponent(SetPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
