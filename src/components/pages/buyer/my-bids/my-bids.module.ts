import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { MyBidsComponent } from './my-bids.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { MyOffersComponent } from './my-offers/my-offers.component';


@NgModule({
  declarations: [
    MyBidsComponent,
    ListingDetailsComponent,
    MyOffersComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    NgxPaginationModule

  ],
  providers: [],
  exports: [MyBidsComponent]
})
export class MyBidsModule { }
