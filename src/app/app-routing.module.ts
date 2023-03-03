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
import { AuthGuard } from 'src/components/auth/auth.guard';
import { AllActiveListingComponent } from 'src/components/pages/buyer/my-bids/all-active-listing/all-active-listings.component';
import { ProfileComponent } from 'src/components/pages/profile/profile.component';
import { EckardTransactionsComponent } from 'src/components/pages/eckard-staff-place/eckard-transactions/eckard-transactions.component';
import { EckardTransactionsMethodsComponent } from 'src/components/pages/eckard-staff-place/eckard-transactions-methods/eckard-transactions-methods.component';
import { SignUpComponent } from 'src/components/auth/sign-up/sign-up.component';



const routes: Routes = [

  { path: "", component: LoginComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "market-place", component: MarketPlaceComponent, canActivate: [AuthGuard] },
  { path: "my-offers", component: MyBidsComponent, canActivate: [AuthGuard] },
  { path: "all-listing", component: AllActiveListingComponent, canActivate: [AuthGuard] },
  { path: "direct-sale/:id", component: AllActiveListingComponent, canActivate: [AuthGuard] },
  { path: "buyer-transactions", component: BuyerTransactionsComponent, canActivate: [AuthGuard] },
  { path: "buyer-notifications", component: BuyerNotificationsComponent, canActivate: [AuthGuard] },
  { path: "my-listing", component: MyListingComponent, canActivate: [AuthGuard] },
  { path: "seller-transactions", component: SellerTransactionsComponent, canActivate: [AuthGuard] },
  { path: "seller-notifications", component: SellerNotificationsComponent, canActivate: [AuthGuard] },
  { path: "sec-disclosure", component: SECDisclosureComponent, canActivate: [AuthGuard] },
  { path: "user-agreement", component: UserAgreementComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'eckard-pending-transactions', component: EckardTransactionsComponent, canActivate: [AuthGuard] },
  { path: 'eckard-completed-transactions', component: EckardTransactionsComponent, canActivate: [AuthGuard] },
  { path: 'eckard-pending-asset', component: EckardTransactionsComponent, canActivate: [AuthGuard] },
  { path: 'eckard-transactions-methods', component: EckardTransactionsMethodsComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "market-place", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
