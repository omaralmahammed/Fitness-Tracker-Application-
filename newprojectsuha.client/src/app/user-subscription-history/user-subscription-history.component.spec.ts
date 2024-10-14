import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubscriptionHistoryComponent } from './user-subscription-history.component';

describe('UserSubscriptionHistoryComponent', () => {
  let component: UserSubscriptionHistoryComponent;
  let fixture: ComponentFixture<UserSubscriptionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSubscriptionHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSubscriptionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
