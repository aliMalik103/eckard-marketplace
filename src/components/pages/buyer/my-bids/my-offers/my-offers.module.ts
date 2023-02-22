import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyOffersService } from 'src/components/services/my-offers.service';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { LoginService } from 'src/components/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MyOffersComponent } from './my-offers.component';


@NgModule({
    declarations: [
        MyOffersComponent,
    ],
    imports: [
        NgMultiSelectDropDownModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        BrowserModule,
        NgxPaginationModule,
        CurrencyMaskModule,
        NgxSpinnerModule

    ],
    providers: [MyOffersService, MyListingsService, LoginService, ToastrService],
    exports: [MyOffersComponent]
})
export class MyOffersDetailsModule { }
