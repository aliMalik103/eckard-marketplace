import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MyBidsComponent } from './my-bids.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyOffersService } from 'src/components/services/my-offers.service';
import { AddNewListingService } from '../../seller/my-listing/add-new-listing/add-new-listing.service';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { LoginService } from 'src/components/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { AllActiveListingComponent } from './all-active-listing/all-active-listings.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ListingDetailsModule } from './listing-details/listing-details.module';
import { MyOffersDetailsModule } from './my-offers/my-offers.module';


@NgModule({
  declarations: [
    MyBidsComponent,
    AllActiveListingComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    NgxPaginationModule,
    CurrencyMaskModule,
    NgxSpinnerModule,
    ListingDetailsModule,
    MyOffersDetailsModule

  ],
  providers: [MyOffersService, AddNewListingService, MyListingsService, LoginService, ToastrService],
  exports: [MyBidsComponent]
})
export class MyBidsModule { }
