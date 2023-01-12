import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-listing',
  templateUrl: './my-listing.component.html',
  styleUrls: ['./my-listing.component.css']
})
export class MyListingComponent implements OnInit {

  showAllListing: boolean = false
  listingsColumns : Array<String> = [
    "Listing Name",
    "Auction Deadline",
    "Account/Project",
    "Total NMA",
    "Minimam Ask",
    "Highest Bid",
    "# Bids"
  ]

  constructor() {

  }
  ngOnInit(): void {
    this.showAllListing = false
    console.log('Method not implemented.');
  }

  handleToggel() {
    this.showAllListing = !this.showAllListing;
  }

}
