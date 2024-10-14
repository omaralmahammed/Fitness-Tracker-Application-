import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlService } from '../../../URL-Service/url.service';

@Component({
  selector: 'app-recipe-dashboard',
  templateUrl: './recipe-dashboard.component.html',
  styleUrl: './recipe-dashboard.component.css'
})


export class RecipeDashboardComponent implements OnInit {
  addRecipeForm!: FormGroup;
  selectedFile: File | null = null; // لتخزين الملف المحدد (الصورة)
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private recipeService: UrlService) { }

  ngOnInit(): void {
    this.addRecipeForm = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      nutritionalFacts: ['', Validators.required],
      image: ['', Validators.required] // هنا سيكون الملف (الصورة
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; // تخزين الملف المحدد
  }

  onSubmit(): void {
    if (this.addRecipeForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.addRecipeForm.get('name')?.value);
      formData.append('categoryId', this.addRecipeForm.get('categoryId')?.value);
      formData.append('description', this.addRecipeForm.get('description')?.value);
      formData.append('nutritionalFacts', this.addRecipeForm.get('nutritionalFacts')?.value);
      formData.append('image', this.selectedFile); // إضافة الصورة إلى FormData

      this.recipeService.addRecipe(formData).subscribe(
        (response) => {
          this.successMessage = 'Recipe added successfully!';
          this.addRecipeForm.reset();
          this.selectedFile = null; // إعادة تعيين الملف بعد الإرسال
        },
        (error) => {
          this.errorMessage = 'An error occurred while adding the recipe. Please try again.';
        }
      );
    }
  }
}
