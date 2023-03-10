import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { BuyerNotificationsModule } from './buyer-notifications/buyer-notifications.module';
import { BuyerTransactionsModule } from './buyer-transactions/buyer.transactions.module';
import { MyBidsModule } from './my-bids/my-bids.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TransactionsModule } from '../transactions/transaction.module';

@NgModule({
    declarations: [
    ],
    imports: [
      NgMultiSelectDropDownModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        BuyerNotificationsModule,
        BuyerTransactionsModule,
        MyBidsModule,
        BrowserAnimationsModule,
        TransactionsModule
    ],
    providers: [MyListingsService],
    exports: []
})
export class BuyerModule { }
