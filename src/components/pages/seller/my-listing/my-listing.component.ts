import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyListings } from 'src/components/model/my-listings';
import { LoginService } from 'src/components/services/login.service';
import { MyListingsService } from 'src/components/services/my-listings.service';

@Component({
  selector: 'app-my-listing',
  templateUrl: './my-listing.component.html',
  styleUrls: ['./my-listing.component.css']
})
export class MyListingComponent implements OnInit {
  listStatus: string = 'Active';

  showAllListing: boolean = false

  listingsColumns: Array<String> = [
    "Listing Name",
    "Auction Deadline",
    "Account/Project",
    "Total NMA",
    "Minimum Ask",
    "Highest Bid",
    "# Bids"
  ]

  listingFilterOptions = [
    {
      value: "Active",
      label: "My Active Listings"
    },
    {
      value: "Draft",
      label: "My Drafted Listings"
    },
    {
      value: "Accepted",
      label: "My Closed Transactions"
    },
    {
      value: "Cancelled",
      label: "My Cancelled Listings"
    },

  ]
  myListings!: MyListings[];
  copyListings!: MyListings[];


  constructor(private myListingsService: MyListingsService, private router: Router, private loginService: LoginService) {
    this.handleResetNewList()
  }
  ngOnInit(): void {

    if (this.loginService.user.status != "active") {
      this.router.navigate(['/market-place']);
      return

    }
    this.getAllMyListings()
  }

  handleFilterList() {
    this.myListings = this.copyListings?.filter((item) => item.status.status === this.listStatus)
  }

  handleToggel() {
    this.showAllListing = !this.showAllListing;
    this.getAllMyListings()

  }

  handleResetNewList() {

    this.myListingsService.handleResetSetNewList()
    this.showAllListing = false

  }

  handleEdit(value: any) {
    this.myListingsService.isListEdit = true;
    let editList = {
      listing_type: value.listing_type.id,
      status: value.status.id,
      listingName: value.listingName,
      listingStart: new Date(value.listingStart).toISOString().slice(0, 16),
      auction_type: value.auction_type,
      auctionEnd: new Date(value.auctionEnd).toISOString().slice(0, 16),
      comments: value.comments,
      account: value.account.id,
      project: value.project.id,
      nma: value.nma,
      minimumAsk: value.minimumAsk,
      buyNowPrice: value.buyNowPrice,
      constraints: value.constraints.map((x: any) => parseInt(x.id)),
      offer: value.offer.map((x: any) => parseInt(x.id)),
      id: value.id
    }
    console.log("draft", value.status.status)

    if (value.status.status == 'Active') {
      console.log("draft", value.status)
      this.myListingsService.isListDraft = false;
    }
    this.myListingsService.newListing = editList
    this.showAllListing = !this.showAllListing;

  }

  getAllMyListings() {
    this.myListingsService.getAllMyListings().subscribe(
      (response) => {
        this.myListings = response?.filter((item) => item.status.status === this.listStatus)
        this.copyListings = response
        this.handleFilterList()
        console.log(response)
      },
      (error: any) => console.log(error),
      () => console.log("Done getting my listings"));
  }

}
