import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SellerTransactionsComponent } from './seller-transactions.component';

@NgModule({
    declarations: [
        SellerTransactionsComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
    ],
    providers: [],
    exports: [SellerTransactionsComponent]
})
export class SellerTransactionsModule { }
