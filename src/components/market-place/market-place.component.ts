import { LoginService } from 'src/components/services/login.service';
import { Component, OnInit } from '@angular/core';
import { MyListingsService } from '../services/my-listings.service';
import { MyOffersService } from '../services/my-offers.service';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css']
})
export class MarketPlaceComponent implements OnInit {
  totalMyListings: number = 0;
  totalMyOffers: number = 0;
  isActiveUser: Boolean = false

  constructor(private myListingsService: MyListingsService, private loginService: LoginService,
    private myOffersService: MyOffersService) {
    this.getAllMyListings()
    this.getAllMyOffers()
  }

  ngOnInit(): void {
    this.isActiveUser = this.loginService?.user?.status == 'active' ? true : false;
  }

  getAllMyListings() {
    this.myListingsService.getAllMyListings(this.loginService.user.id).subscribe(
      (response) => {
        this.totalMyListings = response ? response.length : 0
      },
      (error: any) => console.log(error),
      () => console.log("Done getting my listings"));
  }
  getAllMyOffers() {
    this.myOffersService.getAllMyOffers(this.loginService.user.id).subscribe(
      (response) => {
        this.totalMyOffers = response ? response.length : 0
      },
      (error: any) => console.log(error),
      () => console.log("Done getting my listings"));
  }

}
