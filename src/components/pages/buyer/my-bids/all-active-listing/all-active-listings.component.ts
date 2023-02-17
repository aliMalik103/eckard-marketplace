import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { Status } from 'src/components/model/my-listings'
import { MyOffers } from 'src/components/model/my-offer'
import { AddNewListingService } from 'src/components/pages/seller/my-listing/add-new-listing/add-new-listing.service'
import { LoginService } from 'src/components/services/login.service'
import { MyListingsService } from 'src/components/services/my-listings.service'
import { MyOffersService } from 'src/components/services/my-offers.service'
import { IDropdownSettings } from 'ng-multiselect-dropdown'

@Component({
  selector: 'app-my-all-active-listings',
  templateUrl: './all-active-listings.component.html',
  styleUrls: ['./all-active-listings.component.css']
})
export class AllActiveListingComponent implements OnInit {
  selectedItems = [];
  minAskFiltersSelected = [];
  auctionFiltersSelected = []
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    enableCheckAll: false,
    itemsShowLimit: 3,
    allowSearchFilter: true
  }

  offerStatus: string = 'Active'
  filterByProject: string = ''
  type = 'Silent- Minimum Ask'
  statusOptions!: Status[]
  isDirectSaleOffer: boolean = false
  directSaleId!: any

  page: number = 1
  count: number = 0
  minimumAskFilter = null
  tableSize: number = 50
  tableSizes: any = [3, 6, 9, 12]
  testMyOffer = []
  myOffers!: MyOffers[]
  copymyOffers!: MyOffers[]
  constraintOptions!: any[]
  listDetails!: any

  newOffer: any = {
    id: null,
    contact: null,
    status: null,
    constraints: [],
    comments: '',
    offerAmount: 0
  }
  activeListing: boolean = true

  offersFilterOptions: any = [
    {
      value: 'Active',
      label: 'All Active Listings'
    }
    // {
    //   value: "Pending/Escrow",
    //   label: "Pending/Escrow"
    // },
    // {
    //   value: "Closed Transactions",
    //   label: "Closed Transactions"
    // },
  ]
  allActiveProjects: any = []
  auctionTypeFilters: any = []
  minAskFilters: any = []
  offersColumns!: any
  modifiedColumns: any = {
    'Active Listings': [
      'Seller / Project',
      'Auction End',
      'Action Type',
      'Listed NMA',
      'Minimum Ask',
      'Buy Now at',
      '# Offers',
      'Highest Offer',
      'My Offer'
    ],
    'Closed Listings': [
      'Seller / Project',
      'Auction End',
      'Listed NMA',
      'Minimum Ask',
      'Buy Now at',
      '# Offers',
      'Highest Offer',
      'Sale Price',
      'Sale Date'
    ],
    'Canceled Listings': [
      'Seller / Project',
      'Auction End',
      'Listed NMA',
      'Minimum Ask',
      'Buy Now at',
      '# Offers',
      'Highest Offer',
      'Cancel Date'
    ]
  }
  constructor(
    private router: Router,
    private loginService: LoginService,
    private myListingsService: MyListingsService,
    private myOffersService: MyOffersService,
    private addNewListingService: AddNewListingService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    if (this.loginService.user.status != 'active') {
      this.router.navigate(['/market-place'])
      return
    }
    if (this.activeRoute.snapshot?.routeConfig?.path == 'direct-sale/:id') {
      this.isDirectSaleOffer = true
      this.directSaleId = this.activeRoute.snapshot?.params['id']
    }

    this.getAllListings()
    this.handleConstraint()
    this.handleGetStatus()
  }

  onItemSelect(item: any) {
    console.log(item)
  }
  onSelectAll(items: any) {
    console.log(items)
  }

  getAllListings() {
    this.spinner.show()
    this.myOffersService.getAllListings(this.loginService.user.id).subscribe(
      response => {
        this.spinner.hide()
        this.myOffers = response
        this.copymyOffers = response
        if (this.isDirectSaleOffer) {
          this.offersColumns = this.modifiedColumns['Active Listings']
          this.myOffers = this.copymyOffers?.filter(
            item =>
              item.status == 'Active' &&
              item.auctionType == 'Direct Sale' &&
              item.directSaleToken == this.directSaleId
          )
          if (this.myOffers.length == 0) {
            this.toastr.info('Offer Not Found')
            this.router.navigate(['/market-place'])
          } else {
            this.handleListDetails(
              this.myOffers[0]?.listingId,
              this.myOffers[0]?.offer_id
            )
          }
          return
        }
        this.handleFilterList()
      },
      (error: any) => {
        this.spinner.hide()

        console.log(error)
      },
      () => console.log('Done getting active listings')
    )
  }

  getAllClosedListings() {
    this.spinner.show()
    this.myOffersService
      .getAllClosedListings(this.loginService.user.id)
      .subscribe(
        response => {
          this.spinner.hide()
          this.myOffers = response
          this.copymyOffers = response
          this.handleFilterList()
        },
        (error: any) => {
          this.spinner.hide()

          console.log(error)
        },
        () => console.log('Done getting active listings')
      )
  }

  getAllCancelledListings() {
    this.spinner.show()
    this.myOffersService
      .getAllCancelledListings(this.loginService.user.id)
      .subscribe(
        response => {
          this.spinner.hide()
          this.myOffers = response
          this.copymyOffers = response
          this.handleFilterList()
        },
        (error: any) => {
          this.spinner.hide()

          console.log(error)
        },
        () => console.log('Done getting active listings')
      )
  }

  handleChange() {
    const { offerStatus, copymyOffers } = this
    const noFilters = this.selectedItems.length == 0 && this.auctionFiltersSelected.length == 0 && this.minAskFiltersSelected.length == 0
    const filteredData: any = [];

    if (!noFilters) {
      this.copymyOffers.filter((offer: any) => {
        var filtermapped: any = false;
        if (offer.auctionType !== 'Direct Sale') {
          const project=this.selectedItems.length > 0 ? this.selectedItems.find((acFilter: any) => acFilter.item_id == offer.projectId) : true;
          const auction=this.auctionFiltersSelected.length > 0 ? this.auctionFiltersSelected.find((acFilter: any) => acFilter.item_id == offer.auctionType) : true;
          const min_ask=this.minAskFiltersSelected.length > 0 ? this.minAskFiltersSelected.find((acFilter: any) => acFilter.item_id == offer.minimumAsk) : true;
          if (project && auction && min_ask){
            filtermapped = true;
          }
          else {
            false
          }
          if (filtermapped) {
            filteredData.push(offer)
          }
        }
      })

      this.myOffers = filteredData
    } else {
      this.myOffers = copymyOffers?.filter(
        ({ status, auctionType }) =>
          status === offerStatus && auctionType !== 'Direct Sale'
      )
    }
  }

  onTableDataChange(event: any) {
    this.page = event
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value
    this.page = 1
  }

  handleLength(array: any) {
    if (array && array.length > 0) {
      return true
    }
    return false
  }

  handleFilterList() {
    this.filterByProject = ''
    this.allActiveProjects = []
    switch (this.offerStatus) {
      case 'Active':
        this.offersColumns = this.modifiedColumns['Active Listings']
        this.myOffers = this.copymyOffers?.filter(
          item =>
            item.status === this.offerStatus &&
            item.offer_Status != 'Cancelled' &&
            item.auctionType != 'Direct Sale' &&
            !item.isAuctionEnd &&
            !item.isListingStart
        )
        this.handleChange()
        break
      case 'Accepted':
        this.offersColumns = this.modifiedColumns['Closed Listings']
        this.myOffers = this.copymyOffers?.filter(
          item =>
            item.status === this.offerStatus && item.offer_Status != 'Cancelled'
        )
        this.handleChange()
        break
      case 'Cancelled':
        this.offersColumns = this.modifiedColumns['Canceled Listings']
        this.myOffers = this.copymyOffers?.filter(
          item =>
            item.status === this.offerStatus &&
            item.offer_Status != 'Cancelled' &&
            item.auctionType != 'Direct Sale' &&
            !item.isAuctionEnd &&
            !item.isListingStart
        )
        this.handleChange()
        break

      default:
        return
    }

    const projects: any = [];
    const minAsk: any = [];
    const auctionsTypes: any = [];
    this.myOffers?.map((offer: any) => {
      if (
        !projects.find((project: any) => project.item_id == offer.projectId)
      ) {
        projects.push({ item_id: offer.projectId, item_text: offer.projectId })
      }


      if (
        !minAsk.find(
          (project: any) => project.item_id == offer.minimumAsk
        )
      ) {
        minAsk.push({
          item_id: offer.minimumAsk,
          item_text: offer.minimumAsk,

        })
      }

      if (
        !auctionsTypes.find(
          (project: any) => project.item_id == offer.auctionType
        )
      ) {
        auctionsTypes.push({
          item_id: offer.auctionType,
          item_text: offer.auctionType,

        })
      }
    })

    this.allActiveProjects = projects;
    this.minAskFilters = minAsk;
    this.auctionTypeFilters = auctionsTypes;
  }

  handleConstraint() {
    this.addNewListingService.handleConstraint().subscribe(
      response => {
        const buyOptions: any = []
        response?.map(item => {
          if (item.buyLabel) {
            buyOptions.push({ ...item, isChecked: false })
          }
        })
        this.constraintOptions = buyOptions
      },
      (error: any) => {
        console.log('Error getting buyer Constraint', error)
      },
      () => console.log('Done getting buyer Constraint')
    )
  }

  handleListDetails(id: number, offerId: any) {
    this.spinner.show()

    this.myListingsService.getMyList(id).subscribe(
      response => {
        this.spinner.hide()

        this.listDetails = response
        if (!offerId) {
          this.newOffer.offerAmount = response.minimumAsk
          this.newOffer.id = null
          this.newOffer.contact = null
          this.newOffer.status = null
          this.newOffer.constraints = []
          this.newOffer.comments = ''
        }
      },
      (error: any) => {
        this.spinner.hide()

        console.log('Error getting list details', error)
      },
      () => console.log('Done getting list details')
    )

    if (offerId) {
      this.spinner.show()
      this.myOffersService.getofferDetails(offerId).subscribe(
        response => {
          this.spinner.hide()
          this.newOffer = response
          this.constraintOptions = this.constraintOptions?.map((obj: any) => {
            return {
              id: obj.id,
              constraint: obj.constraint,
              buyLabel: obj.buyLabel,
              isChecked: this.newOffer.constraints?.some(
                (item: any) => item.id === obj.id
              )
            }
          })
        },
        (error: any) => {
          this.spinner.hide()

          console.log('Error getting offer details', error)
        },
        () => console.log('Done getting offer details')
      )
    }
  }

  handleUpdateOffers() {
    this.getAllListings()
  }

  handleGetStatus() {
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

  toggleListing(type: any) {
    this.offerStatus = type
    switch (this.offerStatus) {
      case 'Active':
        this.getAllListings()
        break
      case 'Accepted':
        this.getAllClosedListings()
        break
      case 'Cancelled':
        this.getAllCancelledListings()
        break

      default:
        return
    }
  }
}
