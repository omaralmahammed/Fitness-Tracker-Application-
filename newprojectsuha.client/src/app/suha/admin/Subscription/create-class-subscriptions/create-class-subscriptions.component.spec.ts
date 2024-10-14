import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassSubscriptionsComponent } from './create-class-subscriptions.component';

describe('CreateClassSubscriptionsComponent', () => {
  let component: CreateClassSubscriptionsComponent;
  let fixture: ComponentFixture<CreateClassSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateClassSubscriptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClassSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
