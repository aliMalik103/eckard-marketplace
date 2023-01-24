import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { MyListingModule } from './my-listing/my-listing.module';
import { SellerNotificationsModule } from './seller-notifications/seller-notifications.module';
import { SellerTransactionsModule } from './seller-transactions/seller-transactions.module';

@NgModule({
    declarations: [
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        MyListingModule,
        SellerNotificationsModule,
        SellerTransactionsModule,
        BrowserAnimationsModule
    ],
    providers: [MyListingsService],
    exports: []
})
export class SellerModule { }
