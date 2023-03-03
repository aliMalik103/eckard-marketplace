import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EckardTransactionsMethodsComponent } from './eckard-transactions-methods.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { EckardTransactionsMethodsDetailsComponent } from './eckard-transactions-methods-details/eckard-transactions-methods-details.component';
import { LoginService } from 'src/components/services/login.service';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { MyOffersService } from 'src/components/services/my-offers.service';
import { AddNewListingService } from 'src/components/pages/seller/my-listing/add-new-listing/add-new-listing.service';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [EckardTransactionsMethodsComponent, EckardTransactionsMethodsDetailsComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
  ],
  providers: [LoginService, MyListingsService, MyOffersService, AddNewListingService,ToastrService],
  exports: [EckardTransactionsMethodsComponent]
})
export class EckardTransactionsMethodsModule { }
