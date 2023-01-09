import { LoginComponent } from './../components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketPlaceComponent } from 'src/components/market-place/market-place.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "market-place", component: MarketPlaceComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
