import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginService } from 'src/components/services/login.service';
import { BuyerNotificationsComponent } from './buyer-notifications.component';

@NgModule({
    declarations: [
        BuyerNotificationsComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
    ],
    providers: [LoginService],
    exports: [BuyerNotificationsComponent]
})
export class BuyerNotificationsModule { }
