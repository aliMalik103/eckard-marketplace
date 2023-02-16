import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AddNewListingModule } from './add-new-listing/add-new-listing.module';
import { AddNewListingService } from './add-new-listing/add-new-listing.service';
import { MyListingComponent } from './my-listing.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MyOffersService } from 'src/components/services/my-offers.service';


@NgModule({
    declarations: [
        MyListingComponent,

    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        AddNewListingModule,
        CommonModule,
        NgxPaginationModule,
        NgxSpinnerModule

    ],
    providers: [AddNewListingService, MyOffersService],
    exports: [MyListingComponent]
})
export class MyListingModule { }
