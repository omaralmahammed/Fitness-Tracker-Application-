import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayClassSubscriptionsComponent } from './display-class-subscriptions.component';

describe('DisplayClassSubscriptionsComponent', () => {
  let component: DisplayClassSubscriptionsComponent;
  let fixture: ComponentFixture<DisplayClassSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayClassSubscriptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayClassSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
