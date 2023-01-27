import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { MyBidsComponent } from './my-bids.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { MyOffersService } from 'src/components/services/my-offers.service';
import { AddNewListingService } from '../../seller/my-listing/add-new-listing/add-new-listing.service';


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
  providers: [MyOffersService,AddNewListingService],
  exports: [MyBidsComponent]
})
export class MyBidsModule { }
