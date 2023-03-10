import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginService } from 'src/components/services/login.service';
import { TransactionsModule } from '../../transactions/transaction.module';
import { SellerTransactionsComponent } from './seller-transactions.component';

@NgModule({
    declarations: [
        SellerTransactionsComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        TransactionsModule
    ],
    providers: [LoginService],
    exports: [SellerTransactionsComponent]
})
export class SellerTransactionsModule { }
