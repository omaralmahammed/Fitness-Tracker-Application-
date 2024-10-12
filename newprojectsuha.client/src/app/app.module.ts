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
import { TestimonialComponent } from './testimonial/testimonial.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './Tuqaa/contact-us/contact-us.component';

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
    TestimonialComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  
    FormsModule,       
    HttpClientModule,  
    FormsModule,     
    AppRoutingModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "Shop", component: ShopComponent },
      { path: "gym", component: GymComponent },
      { path: "GymAndClassItems/:type", component: GymAndClassItemsComponent },
      { path: "itemDetails/:id", component: ItemDetailsComponent },
      { path: "subscriptions/:id", component: GymAndClassSubscriptionComponent },
      { path: "Tips", component: TipsComponent },
      { path: "RecipesCategories", component: RecipesCategoriesComponent },
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

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
