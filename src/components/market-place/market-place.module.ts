import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginService } from '../services/login.service';
import { MyOffersService } from '../services/my-offers.service';
import { MarketPlaceComponent } from './market-place.component';

@NgModule({
    declarations: [
        MarketPlaceComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        CommonModule,
        NgxSpinnerModule

    ],
    providers: [LoginService, MyOffersService],
    exports: [MarketPlaceComponent]
})
export class MarketPlaceModule { }
