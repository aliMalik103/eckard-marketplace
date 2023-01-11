import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
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
        SellerTransactionsModule
        
    ],
    providers: [],
    exports: []
})
export class SellerModule { }
