import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarModule } from 'src/components/navbar/navbar.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http"
import { loginModule } from 'src/components/auth/login/login.module';
import { MarketPlaceModule } from 'src/components/market-place/market-place.module';
import { MyListingModule } from 'src/components/pages/my-listing/my-listing.module';
import { AddNewListingModule } from 'src/components/pages/my-listing/add-new-listing/add-new-listing.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    FormsModule,
    HttpClientModule,
    loginModule,
    MarketPlaceModule,
    MyListingModule,
    AddNewListingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
