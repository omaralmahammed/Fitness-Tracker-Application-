import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClassSubscriptionsComponent } from './update-class-subscriptions.component';

describe('UpdateClassSubscriptionsComponent', () => {
  let component: UpdateClassSubscriptionsComponent;
  let fixture: ComponentFixture<UpdateClassSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateClassSubscriptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateClassSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
