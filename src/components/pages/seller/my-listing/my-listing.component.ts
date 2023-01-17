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
    "Minimam Ask",
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

  }
  ngOnInit(): void {

    if (this.loginService.user.status != "active") {
      this.router.navigate(['/market-place']);
      return

    }
    this.showAllListing = false
    this.getAllMyListings()
  }

  handleChange() {
    this.myListings = this.copyListings?.filter((item) => item.status.status === this.listStatus)
  }

  handleToggel() {
    this.showAllListing = !this.showAllListing;
  }

  getAllMyListings() {
    this.myListingsService.getAllMyListings().subscribe(
      (response) => {
        this.myListings = response?.filter((item) => item.status.status === this.listStatus)
        this.copyListings = response
        console.log(response)
      },
      (error: any) => console.log(error),
      () => console.log("Done getting my listings"));
  }

}
