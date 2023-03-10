import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginService } from 'src/components/services/login.service';
import { TransactionsModule } from '../../transactions/transaction.module';
import { BuyerTransactionsComponent } from './buyer-transactions.component';

@NgModule({
    declarations: [
        BuyerTransactionsComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        TransactionsModule
    ],
    providers: [LoginService],
    exports: [BuyerTransactionsComponent]
})
export class BuyerTransactionsModule { }
