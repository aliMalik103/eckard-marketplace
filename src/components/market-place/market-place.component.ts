import { LoginService } from 'src/components/services/login.service';
import { Component, OnInit } from '@angular/core';
import { MyListingsService } from '../services/my-listings.service';
import { MyOffersService } from '../services/my-offers.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css']
})
export class MarketPlaceComponent implements OnInit {
  totalMyListings: number = 0;
  totalMyOffers: number = 0;
  isActiveUser: Boolean = false
  allActiveOffers: number = 0
  totalPendingList: number = 0
  totalPendingOffer: number = 0


  constructor(private myListingsService: MyListingsService, private loginService: LoginService,
    private myOffersService: MyOffersService, private spinner: NgxSpinnerService) {
    this.getAllMyListings()
    this.getAllMyOffers()
    this.handlePendingListsTrancastions()
    this.handlePendingOfferTrancastions()
  }

  ngOnInit(): void {
    this.isActiveUser = this.loginService?.user?.status == 'active' ? true : false;
  }

  getAllMyListings() {
    this.spinner.show();
    this.myListingsService.getAllMyListings(this.loginService.user.id).subscribe(
      (response) => {
        let allListis = response?.filter((item: any) => item.status === "Active" && !item.isAuctionEnd && !item.isListingStart)
        this.totalMyListings = allListis ? allListis.length : 0
        this.spinner.hide();
      },
      (error: any) => {
        console.log(error)
        this.spinner.hide();
      },
      () => console.log("Done getting all my listings"));
  }

  getAllMyOffers() {
    this.spinner.show();
    this.myOffersService.getAllMyOffers(this.loginService.user.id).subscribe(
      (response) => {
        let activeOffers = response?.filter((item: any) => item.status === "Active" && item.offer_Status != "Cancelled" && item.auctionType != 'Direct Sale' && !item.isAuctionEnd && !item.isListingStart)
        this.allActiveOffers = activeOffers ? activeOffers.length : 0
        let myOffers = response?.filter((item: any) => item.offerAmount != null && item.status == "Active" && item.offer_Status == "Active" && item.auctionType != 'Direct Sale' && !item.isAuctionEnd && !item.isListingStart)
        this.totalMyOffers = myOffers ? myOffers.length : 0
        this.spinner.hide();

      },
      (error: any) => {
        this.spinner.hide();
        console.log(error)
      },
      () => console.log("Done getting all offers"));
  }

  handlePendingListsTrancastions() {
    this.spinner.show();
    this.myListingsService.handlePendingListsTrancastions(this.loginService.user.id).subscribe(
      (response) => {
        this.totalPendingList = response ? response?.length : 0
        this.spinner.hide();

      },
      (error: any) => {
        console.log(error)
        this.spinner.hide();
      },
      () => console.log("Done getting pending/closed transactions lists"));
  }

  handlePendingOfferTrancastions() {
    this.spinner.show();
    this.myOffersService.handlePendingOfferTrancastions(this.loginService.user.id).subscribe(
      (response) => {
        this.totalPendingOffer = response ? response.length : 0
        this.spinner.hide();

      },
      (error: any) => {
        console.log(error)
        this.spinner.hide();
      },
      () => console.log("Done getting pending/closed transactions offers"));
  }

}
