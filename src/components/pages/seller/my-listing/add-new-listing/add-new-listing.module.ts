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


@NgModule({
    declarations: [
        AddNewListingComponent,
        GeneralDataTabComponent,
        ListingDetailsTabComponent,
        AddTractsTabComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        CommonModule,
        CurrencyMaskModule

    ],
    providers: [AddNewListingService, MyListingsService, ToastrService, LoginService, CurrencyPipe],
    exports: [AddNewListingComponent]
})
export class AddNewListingModule {

}
