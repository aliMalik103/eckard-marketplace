import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarModule } from 'src/components/navbar/navbar.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http"
import { loginModule } from 'src/components/auth/login/login.module';
import { MarketPlaceModule } from 'src/components/market-place/market-place.module';
import { BuyerModule } from 'src/components/pages/buyer/buyer.module';
import { InformationsModule } from 'src/components/pages/informations/informations.module';
import { SellerModule } from 'src/components/pages/seller/seller.module';



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
    BuyerModule,
    SellerModule,
    InformationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
