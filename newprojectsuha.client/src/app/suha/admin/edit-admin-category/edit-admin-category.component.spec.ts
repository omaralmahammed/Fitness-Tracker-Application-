import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminCategoryComponent } from './edit-admin-category.component';

describe('EditAdminCategoryComponent', () => {
  let component: EditAdminCategoryComponent;
  let fixture: ComponentFixture<EditAdminCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAdminCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
