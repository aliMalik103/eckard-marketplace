import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import {
  AuctionType,
  Constraint,
  MyListing
} from 'src/components/model/my-listings'
import { MyOffersService } from 'src/components/services/my-offers.service'

@Component({
  selector: 'all-offers-tab',
  templateUrl: './all-offers-tab.component.html',
  styleUrls: ['./all-offers-tab.component.css']
})
export class AllOffersTabComponent implements OnInit {
  @Input() ListingDetails!: any
  @Input() statusOptions!: any

  @Output() handleSubmit = new EventEmitter()

  page: number = 1
  count: number = 0
  tableSize: number = 50
  tableSizes: any = [3, 6, 9, 12]
  offers!: any
  offerConfirmMessages: any
  offerDisclaimer!: any
  selectedOffer!: any

  offersTableHead = [
    'Buyer',
    'Offer Amount',
    'Action',
    'Constraints',
    'Comments'
  ]

  constructor(
    private myOffersService: MyOffersService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.handleOfferDealMessages()
    this.handleGetAllOffers()
  }

  handleGetAllOffers() {
    //  const missing=[];
    this.offers = this.ListingDetails?.offer?.filter((item: any) => {
      if (item.status.status != 'Cancelled') {
        this.ListingDetails.listConstraints.map((list: any) => {
          if (list.constraintType == 'block') {
            item.constraints.map((offerContraint: any) => {
              if (offerContraint.id == list.id) {
                offerContraint.block = true;
              }
            })
          }
          if (list.constraintType == 'required') {
            const offerContraint = item.constraints.find(
              (offerContraint: any) => offerContraint.id == list.id
            )
            if (!offerContraint) {
              item.constraints.push({ ...list, missing: true })
              // missing.push()
            }
          }
        })
        // item.constraints.push([...missing])

        return item;
      }
    })
  }

  onTableDataChange(event: any) {
    this.page = event
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value
    this.page = 1
  }

  handleOfferDealMessages() {
    this.spinner.show()

    this.myOffersService.handleOfferDealMessages().subscribe(
      response => {
        this.spinner.hide()
        this.offerConfirmMessages = response
      },
      (error: any) => {
        this.spinner.hide()
        console.error('Error getting Offer : ', error)
      },
      () => console.log('Done getting Offer .')
    )
  }

  handleSellMessage(offer: any) {
    this.selectedOffer = offer
    let message = this.offerConfirmMessages?.filter(
      (item: any) => item.key == 'Selling Disclaimer'
    )
    this.offerDisclaimer = message[0]
  }

  handleSubmitOffer() {
    this.spinner.show()
    let activeItem = this.statusOptions?.find(
      (item: any) => item.status == 'Accepted'
    )
    this.myOffersService
      .handleCheckListStatus(this.ListingDetails.id)
      .subscribe(
        response => {
          if (response.length == 0) {
            let request = {
              offer: {
                offerAmount: this.selectedOffer.offerAmount,
                status: activeItem.id,
                constraints: this.selectedOffer.constraints?.map(
                  (item: any) => item.id
                ),
                comments: this.selectedOffer.comments,
                contact: this.selectedOffer.contact.id
              },
              listing_id: this.ListingDetails.id,
              acceptedOffer: true
            }
            this.handleUpdateOffer(this.selectedOffer.id, request)
          } else {
            this.spinner.hide()
            this.handleSubmit.emit()
            this.router.navigate(['/my-listing'])
            this.toastr.success('Offer Already Accepted!')
          }
        },
        (error: any) => {
          this.spinner.hide()
          console.log('Error getting get handleCheckListStatus', error)
        },
        () => console.log('Done getting get handleCheckListStatus')
      )
  }

  handleUpdateOffer(id: any, body: any) {
    this.myOffersService.handleUpdateOffer(id, body).subscribe(
      response => {
        this.spinner.hide()
        if (response) {
          this.handleSubmit.emit()
          this.router.navigate(['/my-listing'])
          this.toastr.success('Offer Accepted!')
        }
      },
      (error: any) => {
        this.spinner.hide()
        this.toastr.error('Offer Not Found!')
        console.error('Error getting Offer : ', error)
      },
      () => console.log('Done getting Offer .')
    )
  }
}
