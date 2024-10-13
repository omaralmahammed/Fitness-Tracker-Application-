import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTestimonialComponent } from './admin-testimonial.component';

describe('AdminTestimonialComponent', () => {
  let component: AdminTestimonialComponent;
  let fixture: ComponentFixture<AdminTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTestimonialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
