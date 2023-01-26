import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyOffers } from 'src/components/model/my-offer';
import { LoginService } from 'src/components/services/login.service';
import { MyOffersService } from 'src/components/services/my-offers.service';

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.css']
})
export class MyBidsComponent implements OnInit {

  offerStatus: string = 'My Offers';
  filterByProject: string = ''
  type = 'Silent- Minimum Ask'

  page: number = 1;
  count: number = 0;
  tableSize: number = 50;
  tableSizes: any = [3, 6, 9, 12];
  testMyOffer = [
    {
      "listingId": 8,
      "listingName": "test ali1.5",
      "auctionEnd": "2023-02-21T00:00:00Z",
      "offerAmount": 23999,
      "accountName": "Tom Tester - individual",
      "projectId": "ELA Mobley",
      "status": "Active",
      "contact_id": 1,
      "listedNMA": 1.5,
      "minimumAsk": 9750.0,
      "highestBid": 540000,
      "noOfBids": 0,
      "auctionType": "Public - Minimum Ask",
      "buyNowPrice": null,
      "isHighestOffer": false
    },
    {
      "listingId": 6,
      "listingName": "TEST - Mobley",
      "auctionEnd": "2023-01-26T20:47:00Z",
      "offerAmount": null,
      "accountName": "Tom Tester - individual",
      "projectId": "ELA Mobley",
      "status": "Active",
      "contact_id": 1,
      "listedNMA": 1.10068,
      "minimumAsk": 9000.0,
      "highestBid": null,
      "noOfBids": 0,
      "auctionType": "Public - Minimum Ask",
      "buyNowPrice": null,
      "isHighestOffer": false
    },
    {
      "listingId": 5,
      "listingName": "test Ali",
      "auctionEnd": "2023-01-27T17:54:00Z",
      "offerAmount": null,
      "accountName": "Tom Tester - individual",
      "projectId": "ELA Mobley",
      "status": "Active",
      "contact_id": 1,
      "listedNMA": 0.8,
      "minimumAsk": 234444.0,
      "highestBid": null,
      "noOfBids": 0,
      "auctionType": "Public - Minimum Ask",
      "buyNowPrice": null,
      "isHighestOffer": false
    },
    {
      "listingId": 4,
      "listingName": "Partial Liquidation Jan 2023 - Silent Make Me an Offer",
      "auctionEnd": "2023-01-29T00:00:00Z",
      "offerAmount": 25000.0,
      "accountName": "Tom Tester - individual",
      "projectId": "ELA Miller",
      "status": "Active",
      "contact_id": 1,
      "listedNMA": 2.725,
      "minimumAsk": 24950.0,
      "highestBid": 27000.0,
      "noOfBids": 2,
      "auctionType": "Silent - Buy Immediately or Make Me an Offer",
      "buyNowPrice": null,
      "isHighestOffer": false
    },
    {
      "listingId": 2,
      "listingName": "Partial Liquidation Jan 2023 - Direct Sale",
      "auctionEnd": "2023-01-29T00:00:00Z",
      "offerAmount": 31000.0,
      "accountName": "Tom Tester - individual",
      "projectId": "ELA Mobley",
      "status": "Active",
      "contact_id": 1,
      "listedNMA": 2.5,
      "minimumAsk": 29950.0,
      "highestBid": 31000.0,
      "noOfBids": 1,
      "auctionType": "Direct Sale",
      "buyNowPrice": null,
      "isHighestOffer": true
    }
  ]
  myOffers!: MyOffers[];


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
  constructor(private router: Router, private loginService: LoginService, private myOffersService: MyOffersService) {

  }

  ngOnInit(): void {
    if (this.loginService.user.status != "active") {
      this.router.navigate(['/market-place']);
      return

    }
  }

  getAllMyOffers() {
    this.myOffersService.getAllMyOffers(this.loginService.user.id).subscribe(
      (response) => {
        this.myOffers = response
        console.log("my offers", response)
      },
      (error: any) => console.log(error),
      () => console.log("Done getting my listings"));
  }

  handleChange() {
    console.log(this.filterByProject)
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

}
