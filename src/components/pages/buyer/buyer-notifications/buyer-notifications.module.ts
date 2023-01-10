import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BuyerNotificationsComponent } from './buyer-notifications.component';

@NgModule({
    declarations: [
        BuyerNotificationsComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
    ],
    providers: [],
    exports: [BuyerNotificationsComponent]
})
export class BuyerNotificationsModule { }
