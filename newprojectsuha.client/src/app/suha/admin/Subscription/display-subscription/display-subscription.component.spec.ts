import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubscriptionComponent } from './display-subscription.component';

describe('DisplaySubscriptionComponent', () => {
  let component: DisplaySubscriptionComponent;
  let fixture: ComponentFixture<DisplaySubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplaySubscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
