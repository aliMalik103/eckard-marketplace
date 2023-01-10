import { LoginComponent } from './../components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketPlaceComponent } from 'src/components/market-place/market-place.component';
import { MyBidsComponent } from 'src/components/pages/buyer/my-bids/my-bids.component';
import { BuyerTransactionsComponent } from 'src/components/pages/buyer/buyer-transactions/buyer-transactions.component';
import { BuyerNotificationsComponent } from 'src/components/pages/buyer/buyer-notifications/buyer-notifications.component';
import { SellerTransactionsComponent } from 'src/components/pages/seller/seller-transactions/seller-transactions.component';
import { SellerNotificationsComponent } from 'src/components/pages/seller/seller-notifications/seller-notifications.component';
import { SECDisclosureComponent } from 'src/components/pages/informations/sec-disclosure/sec-disclosure.component';
import { UserAgreementComponent } from 'src/components/pages/informations/user-agreement/user-agreement.component';
import { MyListingComponent } from 'src/components/pages/seller/my-listing/my-listing.component';



const routes: Routes = [

  { path: "", component: LoginComponent },
  { path: "market-place", component: MarketPlaceComponent },
  { path: "my-bids", component: MyBidsComponent },
  { path: "buyer-transactions", component: BuyerTransactionsComponent },
  { path: "buyer-notifications", component: BuyerNotificationsComponent },
  { path: "my-listing", component: MyListingComponent },
  { path: "seller-transactions", component: SellerTransactionsComponent },
  { path: "seller-notifications", component: SellerNotificationsComponent },
  { path: "sec-disclosure", component: SECDisclosureComponent },
  { path: "user-agreement", component: UserAgreementComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
