import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SellerNotificationsComponent } from './seller-notifications.component';

@NgModule({
    declarations: [
        SellerNotificationsComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
    ],
    providers: [],
    exports: [SellerNotificationsComponent]
})
export class SellerNotificationsModule { }
