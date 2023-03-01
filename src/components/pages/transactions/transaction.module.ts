import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginService } from 'src/components/services/login.service';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { MyOffersService } from 'src/components/services/my-offers.service';
import { ListingDetailsModule } from '../buyer/my-bids/listing-details/listing-details.module';
import { MyOffersDetailsModule } from '../buyer/my-bids/my-offers/my-offers.module';
import { AddNewListingService } from '../seller/my-listing/add-new-listing/add-new-listing.service';
import { TransactionsComponent } from './transaction.component';

@NgModule({
    declarations: [TransactionsComponent],
    imports: [
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        NgxPaginationModule,
        ListingDetailsModule,
        MyOffersDetailsModule,
        NgxSpinnerModule
    ],
    providers: [MyListingsService, AddNewListingService, LoginService,MyOffersService],
    exports: [TransactionsComponent]
})
export class TransactionsModule { }
