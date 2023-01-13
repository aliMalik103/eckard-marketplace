import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginService } from '../services/login.service';
import { MarketPlaceComponent } from './market-place.component';

@NgModule({
    declarations: [
        MarketPlaceComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        CommonModule
    ],
    providers: [LoginService],
    exports: [MarketPlaceComponent]
})
export class MarketPlaceModule { }
