import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymAndClassSubscriptionComponent } from './gym-and-class-subscription.component';

describe('GymAndClassSubscriptionComponent', () => {
  let component: GymAndClassSubscriptionComponent;
  let fixture: ComponentFixture<GymAndClassSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GymAndClassSubscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymAndClassSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
