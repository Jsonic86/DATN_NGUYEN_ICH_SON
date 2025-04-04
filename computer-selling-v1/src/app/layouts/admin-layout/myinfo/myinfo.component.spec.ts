import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyinfoComponent } from './myinfo.component';

describe('MyinfoComponent', () => {
  let component: MyinfoComponent;
  let fixture: ComponentFixture<MyinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyinfoComponent]
    });
    fixture = TestBed.createComponent(MyinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
