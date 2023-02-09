import { Offer } from './../../../../model/my-offer';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CashConfig, Status } from 'src/components/model/my-listings';
import { LoginService } from 'src/components/services/login.service';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { MyOffersService } from 'src/components/services/my-offers.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {
  @Input() constraintOptions!: any[]
  @Input() newOffer!: any
  @Input() offer: any
  @Input() listDetails: any
  @Output() updateOffers = new EventEmitter()
  @Input() statusOptions!: Status[]
  @Input() index!: any

  cashFlow!: any
  isRecalculate: boolean = false
  calculateTotalCashFlow: any = 0
  offerId!: any
  activeItem!: any
  isacceptedOffer = false
  offerConfirmMessages: any
  offerDisclaimer!: any

  constructor(private myListingsService: MyListingsService,
    private myOffersService: MyOffersService,
    private loginService: LoginService, private toastr: ToastrService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.handleGetCashFlow()
    this.handleGetCashConfig()
    this.handleOfferDealMessages()
  }

  basicCashFlow: CashConfig = {
    id: null,
    noOfMonths: 36,
    decline: 1.5,
    gasPrice: 3.5,
    oilPrice: 75,
    contact: null
  }

  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.newOffer.constraints = this.constraintOptions
      .filter(value => value.isChecked)
      .map(value => value);
  }

  handleGetCashFlow() {
    this.offer.project_id && this.myListingsService.handleGetCashFlow(this.offer.project_id).subscribe(
      (response) => {
        this.cashFlow = response
      },
      (error: any) => {

        console.error("Error getting cashFlow  : ", error);
      },
      () => console.log("Done getting cashFlow  ")
    )
  }

  handleGetCashConfig() {
    this.myListingsService.handleGetCashConfig(this.loginService.user.id).subscribe(
      (response: any) => {
        if (response.length > 0) {
          this.basicCashFlow.id = response[0].id
          this.basicCashFlow.contact = response[0].contact.id
          this.basicCashFlow.decline = response[0].decline
          this.basicCashFlow.gasPrice = response[0].gasPrice
          this.basicCashFlow.oilPrice = response[0].oilPrice
          this.basicCashFlow.noOfMonths = response[0].noOfMonths
        }
        else {
          this.basicCashFlow.id = null

          this.basicCashFlow.contact = null
          this.basicCashFlow.decline = 1.5
          this.basicCashFlow.gasPrice = 3.5
          this.basicCashFlow.oilPrice = 75
          this.basicCashFlow.noOfMonths = 36
        }
      },
      (error: any) => {

        console.error("Error getting cash config details : ", error);
      },
      () => console.log("Done getting cash config details .")
    )
  }

  handleSaveAsDefault(value: any) {
    this.spinner.show()
    value.contact = this.loginService.user.id
    if (value.id) {
      this.handleUpdateCashConfig(value)
    }
    else {
      delete value.id
      this.handleCreateCashConfig(value)
    }

  }

  handleCreateCashConfig(body: any) {
    this.myListingsService.handleCreateCashConfig(body).subscribe(
      (response) => {
        this.spinner.hide()

        if (response) {
          this.handleGetCashConfig()
        }
        this.toastr.success('CashFlow Default Values Add Successfully');

      },
      (error: any) => {
        this.spinner.hide()

        console.error("Error getting create cash Config : ", error);
      },
      () => console.log("Done getting create cash Config .")
    )
  }

  handleUpdateCashConfig(body: any) {
    this.myListingsService.handleUpdateCashConfig(body).subscribe(
      (response) => {
        this.spinner.hide()

        if (response) {
          this.handleGetCashConfig()
          this.toastr.success('CashFlow Default Values Update Successfully');
        }
      },
      (error: any) => {
        this.spinner.hide()

        console.error("Error getting update cash Config : ", error);
      },
      () => console.log("Done getting update cash Config .")
    )
  }

  handleCalculateCashFlow() {
    this.isRecalculate = true
    this.calculateTotalCashFlow = this.myListingsService.handleCalculateCashFlow(this.basicCashFlow, this.cashFlow, this.listDetails);

  }

  handleChange(offer: any) {
    let buyNowPrice = parseFloat(this.listDetails.buyNowPrice);
    if (offer.auctionType.endsWith('Buy Now or Make an Offer')) {
      if (this.newOffer.offerAmount > buyNowPrice) {
        this.newOffer.offerAmount = buyNowPrice
        this.toastr.info('Excessive offer, kindly reconsider!');
        return;
      }

    }

  }

  handleMessage(offer: any) {

    let buyNowPrice = parseFloat(this.listDetails.buyNowPrice);
    this.offerId = null;
    this.activeItem = null;
    this.isacceptedOffer = false;
    this.activeItem = this.statusOptions?.find((item) => item.status === "Active");

    if (offer.auctionType == 'Fix Price' || offer.auctionType == 'Direct Sale') {
      this.activeItem = this.statusOptions?.find((item) => item.status == "Accepted")
      this.offerId = this.activeItem ? this.activeItem.id : null;
      this.isacceptedOffer = true
    }

    else if (offer.auctionType.endsWith('Buy Now or Make an Offer')) {
      if (this.newOffer.offerAmount >= buyNowPrice) {
        this.activeItem = this.statusOptions?.find((item) => item.status === "Accepted");
        this.isacceptedOffer = true;
      }
    }
    if (this.isacceptedOffer) {
      let message = this.offerConfirmMessages?.filter((item: any) => item.key == "Buying Disclaimer")
      this.offerDisclaimer = message[0]
    }
    else {
      let message = this.offerConfirmMessages?.filter((item: any) => item.key == "Buying Offer Disclaimer")
      this.offerDisclaimer = message && message[0]

    }
    this.offerId = this.activeItem ? this.activeItem.id : null;
  }

  handleSubmitOffer(obj: any, offer: any) {
    this.spinner.show()

    this.myListingsService.getMyList(this.listDetails.id).subscribe(
      (response: any) => {
        let listActive = response.status.statusLabel === 'Cancelled' || response.status.statusLabel === 'Accepted'
        if (listActive) {
          this.spinner.hide()
          this.toastr.info('This list has already been closed, submitting or buying an offer is not possible.');
          this.updateOffers.emit()
        }
        else {

          this.myOffersService.handleCheckListStatus(this.listDetails.id).subscribe(
            (response) => {
              if (response.length == 0) {
                let request = {
                  offer: {
                    offerAmount: obj.offerAmount,
                    status: obj.id ? obj.status.id : this.offerId,
                    constraints: obj.constraints?.map((item: any) => item.id),
                    comments: obj.comments,
                    contact: obj.id ? obj.contact.id : this.loginService.user.id
                  },
                  listing_id: this.listDetails.id,
                  acceptedOffer: this.isacceptedOffer
                }
                obj.id
                  ? this.handleUpdateOffer(obj.id, request)
                  : this.handleCreateNewOffer(request);
              }
              else {
                this.spinner.hide()
                this.updateOffers.emit()
                this.toastr.info('Offer Already Accepted!');

              }

            },
            (error: any) => {

              console.log("Error getting list current status ", error)
            },
            () => console.log("Done getting list current status "));
        }

      },
      (error) => {
        this.spinner.hide()
        console.log(error)
      }
    )


  }

  handleCreateNewOffer(body: any) {

    this.myOffersService.handleCreateNewOffer(body).subscribe(
      (response) => {
        this.spinner.hide()

        if (response) {
          this.updateOffers.emit()
          this.toastr.success('Offer Submit Successfully');
        }
      },
      (error: any) => {
        this.spinner.hide()

        this.toastr.error('Offer Not Create!');

        console.error("Error getting make an Offer : ", error);
      },
      () => console.log("Done getting make an Offer .")
    )
  }

  handleUpdateOffer(id: any, body: any) {
    this.myOffersService.handleUpdateOffer(id, body).subscribe(
      (response) => {
        this.spinner.hide()

        if (response) {
          this.updateOffers.emit()
          this.toastr.success('Offer Update Successfully');
        }
      },
      (error: any) => {
        this.spinner.hide()

        this.toastr.error('Offer Not Found!');
        console.error("Error getting update Offer : ", error);
      },
      () => console.log("Done getting update Offer .")
    )
  }
  handleCancelMessage() {
    let message = this.offerConfirmMessages?.filter((item: any) => item.key == "Cancel Offer Disclaimer")
    this.offerDisclaimer = message[0]
  }

  handleCancelOffer(obj: any) {
    const canceledItem = this.statusOptions?.find((item) => item.status == "Cancelled")
    const cancelId = canceledItem ? canceledItem.id : null;
    this.spinner.show()
    this.myListingsService.getMyList(this.listDetails.id).subscribe(
      (response: any) => {

        let listActive = response.status.statusLabel === 'Cancelled' || response.status.statusLabel === 'Accepted'
        if (listActive) {
          this.spinner.hide()
          this.toastr.info('Unable to cancel offer as the list is already closed.');
          this.updateOffers.emit()
          return
        }
        else {
          this.myOffersService.handleCheckListStatus(this.listDetails.id).subscribe(
            (response) => {
              if (response.length == 0) {
                const request = {
                  offer: {
                    offerAmount: obj.offerAmount,
                    status: cancelId,
                    constraints: obj.constraints?.map((item: any) => item.id),
                    comments: obj.comments,
                    contact: obj.id ? obj.contact.id : this.loginService.user.id
                  },

                  listing_id: this.listDetails.id,
                  acceptedOffer: false
                }
                this.myOffersService.handleCancelOffer(obj.id, request).subscribe(
                  (response) => {
                    this.spinner.hide()
                    if (response) {
                      this.updateOffers.emit()
                      this.toastr.success('Offer Cancelled Successfully');
                    }
                  },
                  (error: any) => {
                    this.spinner.hide()
                    this.toastr.error('Offer Not Found!');
                    console.error("Error getting Offer cancel : ", error);
                  },
                  () => console.log("Done getting Offer cancel .")
                )
              }
              else {
                this.spinner.hide()
                this.updateOffers.emit()
                this.toastr.info('Unable to cancel offer as the list is already closed !');
              }
            },
            (error: any) => {
              this.spinner.hide()

              this.toastr.error('List not Found!');

              console.error("Error getting check list current status : ", error);
            },
            () => console.log("Done getting check list current status .")
          )

        }

      },
      (error) => {
        this.spinner.hide()

        console.log(error)
      }
    )


  }

  handleOfferDealMessages() {
    this.myOffersService.handleOfferDealMessages().subscribe(
      (response) => {
        this.offerConfirmMessages = response
      },
      (error: any) => {
        console.error("Error getting Offer Disclaimer: ", error);
      },
      () => console.log("Done getting Offer Disclaimer.")
    )
  }


}
