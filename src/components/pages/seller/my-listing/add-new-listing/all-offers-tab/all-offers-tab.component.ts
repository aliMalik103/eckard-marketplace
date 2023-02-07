import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuctionType, Constraint, MyListing } from 'src/components/model/my-listings';
import { MyOffersService } from 'src/components/services/my-offers.service';

@Component({
  selector: 'all-offers-tab',
  templateUrl: './all-offers-tab.component.html',
  styleUrls: ['./all-offers-tab.component.css']
})

export class AllOffersTabComponent implements OnInit {
  @Input() ListingDetails!: any
  @Input() statusOptions!: any

  @Output() handleSubmit = new EventEmitter()

  page: number = 1;
  count: number = 0;
  tableSize: number = 50;
  tableSizes: any = [3, 6, 9, 12];
  offers!: any
  offerConfirmMessages: any
  offerDisclaimer!: any
  selectedOffer!: any


  offersTableHead = ['Buyer', 'Offer Amount', 'Action', 'Constraints', 'Comments']


  constructor(private myOffersService: MyOffersService, private toastr: ToastrService, private router: Router,

  ) { }

  ngOnInit(): void {
    this.handleGetAllOffers()
    this.handleOfferDealMessages()
  }

  handleGetAllOffers() {
    this.offers = this.ListingDetails?.offer?.filter((item: any) => item.status.status != "Cancelled")
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  handleOfferDealMessages() {
    this.myOffersService.handleOfferDealMessages().subscribe(
      (response) => {
        this.offerConfirmMessages = response
      },
      (error: any) => {
        console.error("Error getting Offer : ", error);
      },
      () => console.log("Done getting Offer .")
    )
  }

  handleSellMessage(offer: any) {
    this.selectedOffer = offer
    let message = this.offerConfirmMessages?.filter((item: any) => item.key == "Selling Disclaimer")
    this.offerDisclaimer = message[0]


  }

  handleSubmitOffer() {
    let activeItem = this.statusOptions?.find((item: any) => item.status == "Accepted")
    this.myOffersService.handleCheckListStatus(this.ListingDetails.id).subscribe(
      (response) => {
        if (response.length == 0) {
          let request = {
            offer: {
              offerAmount: this.selectedOffer.offerAmount,
              status: activeItem.id,
              constraints: this.selectedOffer.constraints?.map((item: any) => item.id),
              comments: this.selectedOffer.comments,
              contact: this.selectedOffer.contact.id
            },
            listing_id: this.ListingDetails.id,
            acceptedOffer: true
          }
          this.handleUpdateOffer(this.selectedOffer.id, request)
        }
        else {
          this.handleSubmit.emit()

        }

      },
      (error: any) => {

        console.log("Error getting get handleCheckListStatus", error)
      },
      () => console.log("Done getting get handleCheckListStatus"));
  }

  handleUpdateOffer(id: any, body: any) {
    this.myOffersService.handleUpdateOffer(id, body).subscribe(
      (response) => {
        if (response) {
          this.handleSubmit.emit()
          this.router.navigate(['/my-listing']);

          this.toastr.success('Offer Accepted!');
        }
      },
      (error: any) => {
        this.toastr.error('Offer Not Found!');
        console.error("Error getting Offer : ", error);
      },
      () => console.log("Done getting Offer .")
    )
  }

}
