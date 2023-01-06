import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MarketPlaceComponent } from './market-place.component';

@NgModule({
    declarations: [
        MarketPlaceComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
    ],
    providers: [],
    exports: [MarketPlaceComponent]
})
export class MarketPlaceModule { }
