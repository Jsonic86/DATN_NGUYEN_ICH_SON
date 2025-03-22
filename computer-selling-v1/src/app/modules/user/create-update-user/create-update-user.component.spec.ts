import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateUserComponent } from './create-update-user.component';

describe('CreateUpdateUserComponent', () => {
  let component: CreateUpdateUserComponent;
  let fixture: ComponentFixture<CreateUpdateUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateUserComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
