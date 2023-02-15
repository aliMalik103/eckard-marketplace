import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import {
  ListingType,
  AuctionType,
  Project,
  Account,
  Status,
  Tract,
  MyListing,
  ContactAccount
} from 'src/components/model/my-listings'
import { MyListingsService } from 'src/components/services/my-listings.service'
import { AddNewListingService } from './add-new-listing.service'
import { ToastrService } from 'ngx-toastr'
import { LoginService } from 'src/components/services/login.service'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-add-new-listing',
  templateUrl: './add-new-listing.component.html',
  styleUrls: ['./add-new-listing.component.css']
})
export class AddNewListingComponent implements OnInit {
  @Output() onGoBack = new EventEmitter()

  listingId: string = ''
  errorMessages!: any
  listingTypeOptions!: ListingType[]
  auctionTypeOptions!: AuctionType[]
  constraintOptions!: any[]
  accountsOptions!: Account[]
  statusOptions!: Status[]
  tracts!: Tract[]
  isListEdit!: boolean
  isListDraft!: boolean
  showOffers!: boolean

  createNewListing: MyListing = {
    listing_type: null,
    status: null,
    listingName: '',
    listingStart: null,
    auction_type: null,
    auctionEnd: '',
    comments: '',
    account: null,
    project: null,
    nma: null,
    minimumAsk: null,
    buyNowPrice: null,
    constraints: [],
    offer: [],
    directSaleToken: ''
  }
  isValidNma!: boolean

  constructor (
    private addNewListingService: AddNewListingService,
    private myListingsService: MyListingsService,
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private spinner: NgxSpinnerService
  ) {
    this.createNewListing = this.myListingsService.newListing
    this.isListEdit = this.myListingsService.isListEdit
    this.showOffers = this.myListingsService.showOffers
    this.isListDraft = this.myListingsService.isListDraft
    this.listingId = this.createNewListing.listingName
  }

  ngOnInit (): void {
    this.handleGetUserAccounts()
    this.handleGetListType()
    this.handleAuctionType()
    this.handleConstraint()
    this.handleGetStatus()
    this.handleGetTracts()
  }

  handleGoBack () {
    this.onGoBack.emit()
    this.myListingsService.handleResetSetNewList()
  }

  handleProjectType (value: number) {
    this.createNewListing.listing_type = value
    if (value == 2) {
      this.toastr.info('Still work in progress')
    }
  }

  handleValidNMA (event: any) {
    this.isValidNma = event
    return this.isValidNma
  }

  isValid (obj: any) {
    const requiredFields = [
      'listing_type',
      'listingName',
      'listingStart',
      'auction_type',
      'auctionEnd',
      'account',
      'project',
      'nma',
      'minimumAsk'
    ]
    if (
      this.createNewListing?.auction_type?.auctionType?.endsWith(
        '- Buy Now or Make an Offer'
      )
    ) {
      requiredFields.push('buyNowPrice')
    }
    const isValid = requiredFields.every(field => obj[field])

    return isValid
  }

  handleStatus (status: any) {
    this.spinner.show()
    this.createNewListing.status = status.id
    delete this.createNewListing.directSaleToken
    this.createNewListing.offer = this.createNewListing.offer?.map((x: any) =>
      parseInt(x.id)
    )
    this.createNewListing.buyNowPrice =
      this.createNewListing.auction_type.auctionType?.endsWith(
        'Buy Now or Make an Offer'
      )
        ? this.createNewListing.buyNowPrice
        : this.createNewListing.minimumAsk

    if (this.isListEdit) {
      if (status.statusLabel == 'Cancelled') {
        this.myListingsService.getMyList(this.createNewListing.id).subscribe(
          (response: any) => {
            let listActive =
              response?.status?.statusLabel === 'Active' ||
              response?.status?.statusLabel === 'Draft'
            let activeOffer = response?.offer?.filter(
              (item: any) => item?.status?.status != 'Cancelled'
            )
            if (listActive && activeOffer.length == 0) {
              this.updateListing(this.createNewListing)
            } else {
              this.spinner.hide()
              this.router.navigate(['/my-listing'])
              this.handleGoBack()
              this.myListingsService.handleResetSetNewList()
              this.toastr.warning(
                ' Unable to cancel offer linked to this list. Please revise.'
              )
            }
          },
          error => {
            console.log(error)
          }
        )
      } else {
        this.updateListing(this.createNewListing)
      }
    } else {
      this.myListingsService.createNewListing(this.createNewListing).subscribe(
        response => {
          this.spinner.hide()
          this.router.navigate(['/my-listing'])
          this.handleGoBack()
          this.myListingsService.handleResetSetNewList()
          this.toastr.success('New List create successfully')
        },
        (error: any) => {
          this.spinner.hide()

          Object.keys(error.error).map(key => {
            this.toastr.error(error.error[key][0], key)
          })
          console.log('error create new list', this.errorMessages)
        },
        () => console.log('Done create new List')
      )
    }
  }

  handleGetListType () {
    this.addNewListingService.handleGetListType().subscribe(
      response => {
        this.listingTypeOptions = response
      },
      (error: any) => {
        console.log('error', error)
      },
      () => console.log('Done getting List Type')
    )
  }

  handleAuctionType () {
    this.addNewListingService.handleAuctionType().subscribe(
      response => {
        this.auctionTypeOptions = response
      },
      (error: any) => {
        console.log('Error getting listing Auction Type', error)
      },
      () => console.log('Done getting listing Auction Type')
    )
  }

  handleConstraint () {
    this.addNewListingService.handleConstraint().subscribe(
      response => {
        const sellOptions:any=[];
       response?.map(item => {
          if (item.sellLabel) {
            if (this.createNewListing?.constraints?.includes(item.id)) {
              sellOptions.push({ ...item, isChecked: true })
            } else {
              sellOptions.push({ ...item, isChecked: false })
            }
          }
        })
        this.constraintOptions=sellOptions;
      },
      (error: any) => {
        console.log('Error getting seller Constraint', error)
      },
      () => console.log('Done getting seller Constraint')
    )
  }

  handleGetStatus () {
    this.addNewListingService.handleGetStatus().subscribe(
      response => {
        this.statusOptions = response
      },
      (error: any) => {
        console.log('Error getting status', error)
      },
      () => console.log('Done getting status ')
    )
  }

  handleGetTracts () {
    this.addNewListingService.handleGetTracts().subscribe(
      response => {
        this.tracts = response
      },
      (error: any) => {
        console.log('Error getting listing Tracts', error)
      },
      () => console.log('Done getting listing Tracts')
    )
  }

  handleGetUserAccounts () {
    this.myListingsService
      .handleGetUserAccounts(this.loginService.user.id)
      .subscribe(
        response => {
          this.accountsOptions = response
          if (this.accountsOptions.length == 1) {
            this.createNewListing.account = this.accountsOptions[0].id
          }
        },
        (error: any) => {
          console.error('Error getting accounts: ', error)
        },
        () => console.log('Done getting accounts.')
      )
  }

  handleGetOffers (offers: any) {
    let activeOffers = offers?.filter(
      (item: any) => item?.status?.statusLabel != 'Cancelled'
    )
    if (activeOffers.length > 0) {
      return false
    }
    return true
  }

  updateListing (listing: any) {
    this.myListingsService.updateListing(listing).subscribe(
      response => {
        this.spinner.hide()
        this.router.navigate(['/my-listing'])
        this.handleGoBack()
        this.myListingsService.handleResetSetNewList()
        this.toastr.success('List update successfully')
      },
      (error: any) => {
        this.spinner.hide()
        Object.keys(error.error).map(key => {
          this.toastr.error(error.error[key][0], key)
        })
      },
      () => console.log("Done List update")
    );
  };

  auctionTypeComparator(a: any, b: any) {
    return (a && b) ? a.id === b.id : false;
  }

}
