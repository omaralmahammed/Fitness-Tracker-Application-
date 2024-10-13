import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllRecipeComponent } from './show-all-recipe.component';

describe('ShowAllRecipeComponent', () => {
  let component: ShowAllRecipeComponent;
  let fixture: ComponentFixture<ShowAllRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAllRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
