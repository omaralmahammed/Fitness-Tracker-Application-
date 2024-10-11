import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymAndClassItemsComponent } from './gym-and-class-items.component';

describe('GymAndClassItemsComponent', () => {
  let component: GymAndClassItemsComponent;
  let fixture: ComponentFixture<GymAndClassItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GymAndClassItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymAndClassItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
