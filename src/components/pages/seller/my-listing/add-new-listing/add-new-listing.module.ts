import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AddNewListingComponent } from './add-new-listing.component';
import { GeneralDataTabComponent } from './general-data-tab/general-data-tab.component';
import { ListingDetailsTabComponent } from './listing-details-tab/listing-details-tab.component';
import { AddTractsTabComponent } from './add-tracts-tab/add-tracts-tab.component';
import { AddNewListingService } from './add-new-listing.service';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/components/services/login.service';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { AllOffersTabComponent } from './all-offers-tab/all-offers-tab.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MyOffersService } from 'src/components/services/my-offers.service';


@NgModule({
    declarations: [
        AddNewListingComponent,
        GeneralDataTabComponent,
        ListingDetailsTabComponent,
        AddTractsTabComponent,
        AllOffersTabComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        CommonModule,
        CurrencyMaskModule,
        NgxPaginationModule,
        NgxSpinnerModule

    ],
    providers: [AddNewListingService,MyOffersService, MyListingsService, ToastrService, LoginService, CurrencyPipe, NgxSpinnerService],
    exports: [AddNewListingComponent]
})
export class AddNewListingModule {

}
