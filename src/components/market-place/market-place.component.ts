import { LoginService } from 'src/components/services/login.service';
import { Component, OnInit } from '@angular/core';
import { MyListingsService } from '../services/my-listings.service';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css']
})
export class MarketPlaceComponent implements OnInit {
  totalMyListings: number = 0;
  isActiveUser: Boolean = false

  constructor(private myListingsService: MyListingsService, private loginService: LoginService) {
    this.getAllMyListings()
  }

  ngOnInit(): void {
    this.isActiveUser = this.loginService?.user?.valid
  }

  getAllMyListings() {
    this.myListingsService.getAllMyListings().subscribe(
      (response) => {
        this.totalMyListings = response.length
      },
      (error: any) => console.log(error),
      () => console.log("Done getting my listings"));
  }

}
