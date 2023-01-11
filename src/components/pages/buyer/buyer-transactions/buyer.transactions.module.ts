import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BuyerTransactionsComponent } from './buyer-transactions.component';

@NgModule({
    declarations: [
        BuyerTransactionsComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
    ],
    providers: [],
    exports: [BuyerTransactionsComponent]
})
export class BuyerTransactionsModule { }
