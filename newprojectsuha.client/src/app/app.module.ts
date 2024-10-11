import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './suha/home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './Tuqa/register/register.component';
import { ShopComponent } from './shop/shop.component';
import { GymComponent } from './gym/gym.component';
import { GymAndClassItemsComponent } from './gym-and-class-items/gym-and-class-items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { GymAndClassSubscriptionComponent } from './gym-and-class-subscription/gym-and-class-subscription.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    RegisterComponent,
    FooterComponent,
    ShopComponent,
    FooterComponent,
    GymComponent,
    GymAndClassItemsComponent,
    ItemDetailsComponent,
    GymAndClassSubscriptionComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "Shop", component: ShopComponent },
      { path: "gym", component: GymComponent},
      { path: "GymAndClassItems/:type", component: GymAndClassItemsComponent },
      { path: "itemDetails/:id", component: ItemDetailsComponent },
      { path: "subscriptions/:id", component: GymAndClassSubscriptionComponent },

    ])


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
