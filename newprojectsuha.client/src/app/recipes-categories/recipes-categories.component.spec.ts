import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesCategoriesComponent } from './recipes-categories.component';

describe('RecipesCategoriesComponent', () => {
  let component: RecipesCategoriesComponent;
  let fixture: ComponentFixture<RecipesCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipesCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
