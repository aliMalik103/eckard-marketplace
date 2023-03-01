import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginService } from 'src/components/services/login.service';
import { SellerNotificationsComponent } from './seller-notifications.component';

@NgModule({
    declarations: [
        SellerNotificationsComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
    ],
    providers: [LoginService],
    exports: [SellerNotificationsComponent]
})
export class SellerNotificationsModule { }
