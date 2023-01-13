import { Component, OnInit } from '@angular/core';
import { MyListings } from 'src/components/model/my-listings';
import { MyListingsService } from 'src/components/services/my-listings.service';

@Component({
  selector: 'app-my-listing',
  templateUrl: './my-listing.component.html',
  styleUrls: ['./my-listing.component.css']
})
export class MyListingComponent implements OnInit {

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
  myListings!: MyListings[];

  constructor(private myListingsService: MyListingsService) {

  }
  ngOnInit(): void {
    this.showAllListing = false
    this.getAllMyListings()
  }

  handleToggel() {
    this.showAllListing = !this.showAllListing;
  }

  getAllMyListings() {
    this.myListingsService.getAllMyListings().subscribe(
      (response) => {
        this.myListings = response
      },
      (error: any) => console.log(error),
      () => console.log("Done getting my listings"));
  }

}
