import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EckardTransactionsComponent } from './eckard-transactions.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/components/services/login.service';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { MyOffersService } from 'src/components/services/my-offers.service';
import { AddNewListingService } from '../../seller/my-listing/add-new-listing/add-new-listing.service';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [EckardTransactionsComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,

  ],
  providers: [MyOffersService, AddNewListingService, MyListingsService, LoginService, ToastrService],
  exports:[EckardTransactionsComponent]
})
export class EckardTransactionsModule { }
