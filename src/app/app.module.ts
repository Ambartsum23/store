import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterComponent } from './filter/filter.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { InfoComponent } from './info/info.component';
import { RoutingModule } from './routing.module';
import { PercentagePipe } from './custompipes/percentage.pipe';
import { CartService } from './services/cart.service';
import { CartComponent } from './cart/cart.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FilterComponent,
    CatalogComponent,
    AllproductsComponent,
    CartComponent,
    InfoComponent,
    PercentagePipe,
    AuthComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [CartService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
