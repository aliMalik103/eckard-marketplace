import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BuyerNotificationsModule } from './buyer-notifications/buyer-notifications.module';
import { BuyerTransactionsModule } from './buyer-transactions/buyer.transactions.module';
import { MyBidsModule } from './my-bids/my-bids.module';

@NgModule({
    declarations: [
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        BuyerNotificationsModule,
        BuyerTransactionsModule,
        MyBidsModule,
        BrowserAnimationsModule
    ],
    providers: [],
    exports: []
})
export class BuyerModule { }
