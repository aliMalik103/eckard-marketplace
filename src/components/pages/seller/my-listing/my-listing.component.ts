import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactListing } from 'src/components/model/my-listings';
import { LoginService } from 'src/components/services/login.service';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { MyOffersService } from 'src/components/services/my-offers.service';


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
  isShowOffers: boolean = false
  offerConfirmMessages!: any


  constructor(private myListingsService: MyListingsService, private router: Router,
    private loginService: LoginService, private spinner: NgxSpinnerService, private myOffersService: MyOffersService,) {
    this.handleResetNewList()
  }

  ngOnInit(): void {
    this.userId = this.loginService.user.id
    if (this.loginService.user.status != "active") {
      this.router.navigate(['/market-place']);
      return

    }
    this.handleOfferDealMessages()
    this.getAllMyListings()
  }

  handleFilterList() {
    if (this.listStatus == 'Active') {
      this.myListings = this.copyListings?.filter((item) => item.status === this.listStatus && !item.isAuctionEnd && !item.isListingStart)
    }
    else {

      let futureActive = this.copyListings?.filter((item) => item.status == "Active" && item.isListingStart)
      let draft = this.copyListings?.filter((item) => item.status == "Draft" && (item.isListingStart || (!item.isListingStart || !item.isAuctionEnd)))
      this.myListings = [...futureActive, ...draft]
    }
  }

  handleToggel() {
    this.showAllListing = !this.showAllListing;
    this.isShowOffers = false
    this.getAllMyListings()

  }

  handleNewList() {
    const { value1: defaultTime } = this.offerConfirmMessages?.find((item: any) => item.key === 'Maximum Auction Duration');
    const defaultDuration: moment.Duration = moment.duration(defaultTime, 'hours');
    const fourWeeksFromNow = moment(this.myListingsService.newListing.listingStart).add(defaultDuration).startOf('day');
    this.myListingsService.newListing.auctionEnd = fourWeeksFromNow.format().slice(0, 16)
    this.showAllListing = !this.showAllListing;
    this.isShowOffers = false
  }

  handleResetNewList() {
    this.isShowOffers = false
    this.myListingsService.handleResetSetNewList()
    this.showAllListing = false

  }

  handleEdit(value: any) {
    this.spinner.show();
    this.myListingsService.getMyList(value.listingId).subscribe(
      (response) => {
        this.myListingsService.isListEdit = true;
        let editList = {
          listing_type: response?.listing_type.id,
          status: response.status,
          listingName: response.listingName,
          listingStart: response.listingStart,
          auction_type: response.auction_type,
          auctionEnd: response.auctionEnd,
          comments: response.comments,
          account: response.account.id,
          project: response.project.id,
          nma: response.nma,
          minimumAsk: response.minimumAsk,
          buyNowPrice: response.buyNowPrice,
          constraints: response.constraints.map((x: any) => parseInt(x.id)),
          listConstraints: response.constraints,
          offer: response.offer,
          id: response.id,
          directSaleToken: response.directSaleToken
        }
        if (response.status.status == 'Active') {
          this.myListingsService.isListDraft = false;
        }
        this.myListingsService.newListing = editList
        this.showAllListing = !this.showAllListing;
        this.spinner.hide();

      },
      (error: any) => {
        console.log(error)
        this.spinner.hide();
      },
      () => console.log("Done getting list details"));

  }

  handleOffers(value: any) {
    this.isShowOffers = !this.isShowOffers
    this.handleEdit(value)
    this.myListingsService.showOffers = true;
  }

  getAllMyListings() {
    this.spinner.show();
    this.myListingsService.getAllMyListings(this.loginService.user.id).subscribe(
      (response) => {
        this.myListings = response
        this.copyListings = response
        this.handleFilterList()
        this.spinner.hide();
      },
      (error: any) => {
        console.log(error)
        this.spinner.hide();
      },
      () => console.log("Done getting list details"));
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

  handleOfferDealMessages() {
    this.myOffersService.handleOfferDealMessages().subscribe(
      (response) => {
        this.offerConfirmMessages = response

      },
      (error: any) => {
        console.error("Error getting key vlaue  : ", error);
      },
      () => console.log("Done getting key vlaue .")
    )
  }

}
