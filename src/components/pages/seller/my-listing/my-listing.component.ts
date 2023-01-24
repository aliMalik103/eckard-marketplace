import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactListing } from 'src/components/model/my-listings';
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
    "Listed NMA",
    "Minimum Ask",
    "Highest Offer",
    "# Offers"
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
    // {
    //   value: "Accepted",
    //   label: "My Closed Transactions"
    // },
    // {
    //   value: "Cancelled",
    //   label: "My Cancelled Listings"
    // },

  ]
  myListings!: ContactListing[];
  copyListings!: ContactListing[];
  userId!: number;

  page: number = 1;
  count: number = 0;
  tableSize: number = 50;
  tableSizes: any = [3, 6, 9, 12];


  constructor(private myListingsService: MyListingsService, private router: Router, private loginService: LoginService) {
    this.handleResetNewList()
  }

  ngOnInit(): void {
    this.userId = this.loginService.user.id
    if (this.loginService.user.status != "active") {
      this.router.navigate(['/market-place']);
      return

    }
    this.getAllMyListings()
  }

  handleFilterList() {
    this.myListings = this.copyListings?.filter((item) => item.status === this.listStatus)
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

    this.myListingsService.getMyList(value.listingId).subscribe(
      (response) => {
        this.myListingsService.isListEdit = true;
        let editList = {
          listing_type: response?.listing_type.id,
          status: response.status.id,
          listingName: response.listingName,
          listingStart: new Date(response.listingStart).toISOString().slice(0, 16),
          auction_type: response.auction_type,
          auctionEnd: new Date(response.auctionEnd).toISOString().slice(0, 16),
          comments: response.comments,
          account: response.account.id,
          project: response.project.id,
          nma: response.nma,
          minimumAsk: response.minimumAsk,
          buyNowPrice: response.buyNowPrice,
          constraints: response.constraints.map((x: any) => parseInt(x.id)),
          offer: response.offer.map((x: any) => parseInt(x.id)),
          id: response.id
        }
        if (response.status.status == 'Active') {
          this.myListingsService.isListDraft = false;
        }
        this.myListingsService.newListing = editList
        this.showAllListing = !this.showAllListing;

      },
      (error: any) => console.log(error),
      () => console.log("Done getting my listings"));

  }

  getAllMyListings() {
    this.myListingsService.getAllMyListings(this.loginService.user.id).subscribe(
      (response) => {
        this.myListings = response
        this.copyListings = response
        this.handleFilterList()
      },
      (error: any) => console.log(error),
      () => console.log("Done getting my listings"));
  }


  onTableDataChange(event: any) {
    this.page = event;
    this.getAllMyListings();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllMyListings();
  }

  handleListingLength() {
    if (this.myListings) {
      return this.myListings.length
    }
    return 0
  }

}
