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
  @Input() isTransaction = false
  @Input() transactionStatus = ''
  isShow: boolean = false
  accountsOptions!: any
  cashFlowStatus: string = ''
  isDefaults: boolean = false
  selectedAccount!: any

  cashFlow!: any
  blockOffer = false
  isRecalculate: boolean = false
  calculateTotalCashFlow: any = 0
  offerId!: any
  activeItem!: any
  isacceptedOffer = false
  offerConfirmMessages: any
  offerDisclaimer!: any

  currentTargetList!: any

  constructor(private myListingsService: MyListingsService,
    private myOffersService: MyOffersService,
    private loginService: LoginService, private toastr: ToastrService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.handleOfferDealMessages()
    this.handleGetUserAccounts()
    if (!this.isTransaction) {

      this.handleGetCashFlow()
      this.handleGetCashConfig()
    }
    if (this.isTransaction) {
      this.handleConstrainsOptions()
    }

  }

  basicCashFlow: any = {
    id: null,
    months: null,
    decline: null,
    gas: null,
    oil: null,
    contact: null
  }

  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {

    this.newOffer.constraints = this.constraintOptions
      .filter(value => value.isChecked)
      .map(value => value);
    console.log("Listing Details", this.listDetails, this.newOffer.constraints)
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
          this.isDefaults = false
          this.cashFlowStatus = 'Defaults'
          this.basicCashFlow.id = response[0]?.id
          this.basicCashFlow.contact = response[0]?.contact.id
          this.basicCashFlow.months = response[0]?.json_fields.months;
          this.basicCashFlow.decline = response[0]?.json_fields.decline;
          this.basicCashFlow.oil = response[0]?.json_fields.oil;
          this.basicCashFlow.gas = response[0]?.json_fields.gas;
        }
        else {
          if (this.isDefaults) {
            this.toastr.info('CashFlow Defaults Value does not exist')
          }
          this.isDefaults = false
          this.cashFlowStatus = 'Standard'
          let standard = this.offerConfirmMessages?.filter((item: any) => item.key.endsWith('Standard'))
          this.handleBasicCashFlow(standard)
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
    this.calculateTotalCashFlow = this.myListingsService.handleCalculateCashFlow(this.loginService.user, this.basicCashFlow, this.cashFlow, this.listDetails);

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
    this.blockOffer = false;
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

      this.checkOfferBlocked()
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

  checkOfferBlocked() {

    this.listDetails.constraints.map((list: any) => {

      if (list.constraintType == "block") {
        const offerContraint = this.newOffer.constraints.find((offerContraint: any) => offerContraint.id == list.id);
        if (offerContraint != undefined) {
          this.blockOffer = true;
        }
      }
      if (list.constraintType == "required") {
        const offerContraint = this.newOffer.constraints.find((offerContraint: any) => offerContraint.id == list.id);
        if (offerContraint == undefined) {
          this.blockOffer = true;
        }
      }

    })

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

  toggleCashFlow(type: any) {
    this.cashFlowStatus = type
    switch (this.cashFlowStatus) {
      case 'Conservative':
        let conservative = this.offerConfirmMessages?.filter((item: any) => item.key.endsWith('Conservative'))
        this.handleBasicCashFlow(conservative)
        break;
      case 'Standard':
        let standard = this.offerConfirmMessages?.filter((item: any) => item.key.endsWith('Standard'))
        this.handleBasicCashFlow(standard)
        break;
      case 'Assertive':
        let assertive = this.offerConfirmMessages?.filter((item: any) => item.key.endsWith('Assertive'))
        this.handleBasicCashFlow(assertive)
        break;
      case 'Defaults':
        this.isDefaults = true
        this.handleGetCashConfig()
        break;

      default:
        return
    }

  }

  handleBasicCashFlow(obj: any) {
    const value1Object = obj && obj[0] && JSON.parse(obj[0]?.value1);
    this.basicCashFlow.id = this.basicCashFlow?.id ? this.basicCashFlow.id : null
    this.basicCashFlow.contact = this.basicCashFlow?.contact ? this.basicCashFlow.contact : null
    this.basicCashFlow.months = value1Object?.months;
    this.basicCashFlow.decline = value1Object?.decline;
    this.basicCashFlow.oil = value1Object?.oil;
    this.basicCashFlow.gas = value1Object?.gas;

  }

  handleConstrainsOptions() {
    this.constraintOptions = this.constraintOptions?.map((obj: any) => {
      return {
        id: obj.id,
        constraint: obj.constraint,
        buyLabel: obj.buyLabel,
        isChecked: this.newOffer.constraints?.some((item: any) => item.id === obj.id)
      }
    });
  }


  handleGetUserAccounts() {
    this.myListingsService
      .handleGetUserAccounts(this.loginService.user.id)
      .subscribe(
        response => {
          this.accountsOptions = response

        },
        (error: any) => {
          console.error('Error getting accounts: ', error)
        },
        () => console.log('Done getting accounts.')
      )
  }

  auctionTypeComparator(a: any, b: any) {
    return (a && b) ? a.id === b.id : false;
  }

  handleAccountTargetMessage(obj: any) {
    this.isShow = true
    this.currentTargetList = obj
    let message = this.offerConfirmMessages?.filter((item: any) => item.key == "Target Account")
    this.offerDisclaimer = message[0]

    console.log(this.selectedAccount, this.currentTargetList)
  }

  clearSelectedAccount() {
    this.isShow = false
    this.selectedAccount = null;
    // close pop modal
  }

  handleAssociateAccount() {
    this.spinner.show()
    this.isShow = false
    let id = this.currentTargetList?.offer[0]?.id
    let body = {
      offer: {
        account: this.selectedAccount.id
      },
      listing_id: this.currentTargetList.id,
      acceptedOffer: false
    }

    this.myOffersService.handleUpdateOffer(id, body).subscribe(
      (response) => {
        this.spinner.hide()
        this.updateOffers.emit()
        if (response) {
          this.offer.offer[0].account = this.selectedAccount
          this.toastr.success('Account Associate Successfully');
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

}
