import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AddNewListingComponent } from './add-new-listing.component';
import { GeneralDataTabComponent } from './general-data-tab/general-data-tab.component';
import { ListingDetailsTabComponent } from './listing-details-tab/listing-details-tab.component';
import { AddTractsTabComponent } from './add-tracts-tab/add-tracts-tab.component';
import { AddNewListingService } from './add-new-listing.service';

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

    ],
    providers: [AddNewListingService],
    exports: [AddNewListingComponent]
})
export class AddNewListingModule {

}
