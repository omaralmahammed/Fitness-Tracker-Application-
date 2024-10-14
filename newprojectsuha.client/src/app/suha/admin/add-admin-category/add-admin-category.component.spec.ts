import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminCategoryComponent } from './add-admin-category.component';

describe('AddAdminCategoryComponent', () => {
  let component: AddAdminCategoryComponent;
  let fixture: ComponentFixture<AddAdminCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAdminCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
