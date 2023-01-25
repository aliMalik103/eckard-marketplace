import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/components/services/login.service';

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.css']
})
export class MyBidsComponent implements OnInit {

  offerStatus: string = 'My Offers';

  offersFilterOptions: any = [
    {
      value: "My Offers",
      label: "My Offers"
    },
    {
      value: "All Active Listings",
      label: "All Active Listings"
    },
    {
      value: "Pending/Escrow",
      label: "Pending/Escrow"
    },
    {
      value: "Closed Transactions",
      label: "Closed Transactions"
    },
  ]
  offersColumns: Array<String> = [
    "Seller / Project",
    "Auction End",
    "Listed NMA",
    "Minimum Ask",
    "Buy Now at",
    "# Offers",
    "Highest Offer",
    "My Offer"
  ]
  constructor(private router: Router, private loginService: LoginService) {

  }

  ngOnInit(): void {
    if (this.loginService.user.status != "active") {
      this.router.navigate(['/market-place']);
      return

    }
  }

}
