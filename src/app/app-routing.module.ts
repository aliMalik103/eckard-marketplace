import { LoginComponent } from './../components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketPlaceComponent } from 'src/components/market-place/market-place.component';
import { MyListingComponent } from 'src/components/pages/my-listing/my-listing.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "market-place", component: MarketPlaceComponent },
  { path: "my-listing", component: MyListingComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
