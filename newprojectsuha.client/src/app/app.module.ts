import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './suha/home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ShopComponent } from './shop/shop.component';
import { GymComponent } from './gym/gym.component';
import { GymAndClassItemsComponent } from './gym-and-class-items/gym-and-class-items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { GymAndClassSubscriptionComponent } from './gym-and-class-subscription/gym-and-class-subscription.component';
import { PreLoaderComponent } from './pre-loader/pre-loader.component';
import { RouterModule } from '@angular/router';
import { LogInComponent } from './Tuqaa/log-in/log-in.component';
import { RegisterComponent } from './Tuqaa/register/register.component';
import { TipsComponent } from './tips/tips.component';
import { RecipesCategoriesComponent } from './recipes-categories/recipes-categories.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AboutComponent } from './Tuqaa/about/about.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CartComponent } from './cart/cart.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './Tuqaa/contact-us/contact-us.component';
import { ProfileComponent } from './Qusai/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { DashboardComponent } from './suha/admin/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
//import { AllProductComponent } from './all-product/all-product.component';
import { AdminTestimonialComponent } from './suha/admin/admin-testimonial/admin-testimonial.component';
import { AllProductsComponent } from './all-product/all-product.component';
import { RecipeDashboardComponent } from './suha/admin/recipe-dashboard/recipe-dashboard.component';
import { ShowAllRecipeComponent } from './suha/admin/show-all-recipe/show-all-recipe.component';
import { AdminContactComponent } from './suha/admin/admin-contact/admin-contact.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

 
import { DisplayComponent } from './suha/admin/GymAndClasses/display/display.component';
import { UpdateComponent } from './suha/admin/GymAndClasses/update/update.component';
import { CreateComponent } from './suha/admin/GymAndClasses/create/create.component';
//import { OrderhistoryComponent } from './suha/admin/orderhistory/orderhistory.component';
//import { AdminOrdersComponent } from './suha/admin/orderhistory/orderhistory.component';
//import { OrderhistoryComponent } from './suha/admin/orderhistory/orderhistory.component';
import { GetAllUSERSComponent } from './suha/admin/get-all-users/get-all-users.component';
import { AdminOrdersComponent } from './suha/admin/orderhistory/orderhistory.component';
import { CategoriesComponent } from './Categories/categories/categories.component';
import { EditCategoryComponent } from './Categories/edit-category/edit-category.component';
import { AddCategoryComponent } from './Categories/add-category/add-category.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UpdateSubscriptionComponent } from './suha/admin/Subscription/update-subscription/UpdateSubscriptionComponent';
import { CreateSubscriptionComponent } from './suha/admin/Subscription/create-subscription/create-subscription.component';
import { DisplaySubscriptionComponent } from './suha/admin/Subscription/display-subscription/display-subscription.component';
import { DisplayClassSubscriptionsComponent } from './suha/admin/Subscription/display-class-subscriptions/display-class-subscriptions.component';
import { CreateClassSubscriptionsComponent } from './suha/admin/Subscription/create-class-subscriptions/create-class-subscriptions.component';
import { UpdateClassSubscriptionsComponent } from './suha/admin/Subscription/update-class-subscriptions/update-class-subscriptions.component';
import { EditRecipeComponent } from './suha/admin/edit-recipe/edit-recipe.component';
import { UserSubscriptionHistoryComponent } from './user-subscription-history/user-subscription-history.component';
import { TipsAdminComponent } from './suha/admin/tips-admin/tips-admin.component';
import { AddTipsComponent } from './suha/admin/add-tips/add-tips.component';
import { AdminCategoryComponent } from './suha/admin/admin-category/admin-category.component';
import { DisplayProductsComponent } from './suha/admin/Product/display-products/display-products.component';
import { CreateProductsComponent } from './suha/admin/Product/create-products/create-products.component';
import { UpdateProductsComponent } from './suha/admin/Product/update-products/update-products.component';
import { EditAdminCategoryComponent } from './suha/admin/edit-admin-category/edit-admin-category.component';
import { AddAdminCategoryComponent } from './suha/admin/add-admin-category/add-admin-category.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    ShopComponent,
    GymComponent,
    GymAndClassItemsComponent,
    ItemDetailsComponent,
    GymAndClassSubscriptionComponent,
    PreLoaderComponent,
    LogInComponent,
    RegisterComponent,
    PreLoaderComponent,
    GymAndClassItemsComponent,
    TipsComponent,
    RecipesCategoriesComponent,
    RecipesComponent,
    AboutComponent,
   ContactUsComponent,
    SingleProductComponent,
    CartComponent,
    RecipeDetailsComponent,
    TestimonialComponent,
    CheckoutComponent,
    ProfileComponent,
    DashboardComponent,
    AddProductComponent,
    //AllProductComponent,
    AdminTestimonialComponent,
    AllProductsComponent,
    RecipeDashboardComponent,
    ShowAllRecipeComponent,
    DisplayComponent,
    UpdateComponent,
    CreateComponent,
    AdminOrdersComponent,
    AdminContactComponent,
    GetAllUSERSComponent,
    CategoriesComponent,
    EditCategoryComponent,
    AddCategoryComponent,
    OrderHistoryComponent,
    MyProfileComponent,
    UpdateSubscriptionComponent,
    CreateSubscriptionComponent,
    DisplaySubscriptionComponent,
    DisplayClassSubscriptionsComponent,
    CreateClassSubscriptionsComponent,
    UpdateClassSubscriptionsComponent,
    EditRecipeComponent,
    OrderHistoryComponent,
    TipsAdminComponent,
    AddTipsComponent,
    EditProductComponent,
    AdminCategoryComponent,
    UserSubscriptionHistoryComponent,
    DisplayProductsComponent,
    CreateProductsComponent,
    UpdateProductsComponent,
    EditAdminCategoryComponent,
    AddAdminCategoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,  
    FormsModule,           
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "Shop", component: ShopComponent },
      { path: "gym", component: GymComponent },
      { path: "GymAndClassItems/:type", component: GymAndClassItemsComponent },
      { path: "itemDetails/:id", component: ItemDetailsComponent },
      { path: "subscriptions/:id", component: GymAndClassSubscriptionComponent },
      { path: "Tips", component: TipsComponent },
      { path: "RecipesCategories", component: RecipesCategoriesComponent },
      { path : "Recipe/:id", component:RecipesComponent},
      { path:"Recipedetals/:id", component:RecipeDetailsComponent},
      {path : "Recipe", component:RecipesComponent},

      { path: "LogIn", component: LogInComponent },
      { path: "Register", component: RegisterComponent },
      { path: "SingleProduct/:id", component: SingleProductComponent },
      { path: "subscriptions/:id", component: GymAndClassSubscriptionComponent },
      { path: "Tips", component: TipsComponent },
      { path: "About", component: AboutComponent },
      { path: "Contact", component: ContactUsComponent },
      { path: "Tips", component: TipsComponent },
      { path: "cart", component: CartComponent },
      { path: "Testimonial", component: TestimonialComponent },
      { path: "checkout", component: CheckoutComponent },
      { path: "checkout", component: CheckoutComponent },  
      { path: "profile", component: ProfileComponent },
      { path: "orderhistory", component: OrderHistoryComponent },
      { path: "usersubscriptions", component: UserSubscriptionHistoryComponent },

      {
        path: "dash", component: DashboardComponent,
        children: [

          { path: "", component: GetAllUSERSComponent, pathMatch: "full" }, 

          //Products

          { path: "EditProduct/:id", component: EditProductComponent },
          { path: "AddProduct", component: AddProductComponent },
          { path: "AllProduct", component: AllProductsComponent },

          //Categories

          { path: "EditCategory/:id", component: EditCategoryComponent },
          { path: "AddCategory", component: AddCategoryComponent },
          { path: "Categories", component: CategoriesComponent },

         
          { path: "recipeDashboard", component: RecipeDashboardComponent },
          { path: "showrecipe", component: ShowAllRecipeComponent },
          { path: "editRecipe/:id", component: EditRecipeComponent },

          { path: "AllTips", component: TipsAdminComponent },
          { path: "addTips" , component:AddTipsComponent},

          //Gym and Classes
          { path: "Display_GymAndClasses", component: DisplayComponent },
          { path: "create-gym-class", component: CreateComponent },
          { path: "update-gym-class/:id", component: UpdateComponent },
          { path: "Orderhisstory", component: AdminOrdersComponent },
          { path: "TestimonialAdmin", component: AdminTestimonialComponent },
          //Products

          { path: "DisplayProducts", component: DisplayProductsComponent },

          //Sybscription
          { path: "Display-Subscription", component: DisplaySubscriptionComponent},
          { path: "Update-Subscription/:id", component: UpdateSubscriptionComponent },
          { path: "Create-Subscription", component: CreateSubscriptionComponent },  
          { path: "display-class-subscription/:id", component: DisplayClassSubscriptionsComponent }, //display-class-subscription
          { path: "create-class-subscription/:id", component: CreateClassSubscriptionsComponent },
          { path: "update-class-subscription/:id", component: UpdateClassSubscriptionsComponent },
          { path: "ContactAdmin", component: AdminContactComponent },
          { path: "AdminTestimonial", component: AdminTestimonialComponent },
          { path: "GetAllUsers", component: GetAllUSERSComponent },
          { path: "AdminCategory", component: AdminCategoryComponent },


          { path: "addprodect", component: CreateProductsComponent },
          { path: "updateprodect/:id" , component:UpdateProductsComponent},
          { path: "AdminCategory", component: AdminCategoryComponent } ,
          { path: "AdminCategory", component: AdminCategoryComponent },
          { path: "EditAdminCategory/:id", component: EditAdminCategoryComponent },
          { path: "AddAdminCategory", component: AddAdminCategoryComponent }
        ]
      },
      { path: "dash", component: DashboardComponent },
      { path: "myProfile", component: MyProfileComponent },



    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
