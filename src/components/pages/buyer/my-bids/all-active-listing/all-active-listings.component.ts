import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/components/model/my-listings';
import { MyOffers } from 'src/components/model/my-offer';
import { AddNewListingService } from 'src/components/pages/seller/my-listing/add-new-listing/add-new-listing.service';
import { LoginService } from 'src/components/services/login.service';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { MyOffersService } from 'src/components/services/my-offers.service';

@Component({
  selector: 'app-my-all-active-listings',
  templateUrl: './all-active-listings.component.html',
  styleUrls: ['./all-active-listings.component.css']
})
export class AllActiveListingComponent implements OnInit {

  offerStatus: string = 'Active';
  filterByProject: string = ''
  type = 'Silent- Minimum Ask'
  statusOptions!: Status[]
  isDirectSaleOffer: boolean = false
  directSaleId!: any


  page: number = 1;
  count: number = 0;
  tableSize: number = 50;
  tableSizes: any = [3, 6, 9, 12];
  testMyOffer = []
  myOffers!: MyOffers[];
  copymyOffers!: MyOffers[];
  constraintOptions!: any[]
  listDetails!: any

  newOffer: any = {
    id: null,
    contact: null,
    status: null,
    constraints: [],
    comments: "",
    offerAmount: 0
  }

  offersFilterOptions: any = [
    {
      value: "Active",
      label: "All Active Listings"
    },
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
  offersColumns: Array<String> = [
    "Seller / Project",
    "Auction End",
    "Listed NMA",
    "Minimum Ask",
    "Buy Now at",
    "# Offers",
    "Highest Offer",
    "My Offer"
  ]
  constructor(private router: Router, private loginService: LoginService, private myListingsService: MyListingsService,
    private myOffersService: MyOffersService, private addNewListingService: AddNewListingService,
    private activeRoute: ActivatedRoute, private toastr: ToastrService, private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    if (this.loginService.user.status != "active") {
      this.router.navigate(['/market-place']);
      return

    }
    if (this.activeRoute.snapshot?.routeConfig?.path == "direct-sale/:id") {
      this.isDirectSaleOffer = true
      this.directSaleId = this.activeRoute.snapshot?.params['id']
    }

    this.getAllMyOffers()
    this.handleConstraint()
    this.handleGetStatus()
  }

  getAllMyOffers() {
    this.spinner.show()
    this.myOffersService.getAllMyOffers(this.loginService.user.id).subscribe(
      (response) => {
        this.spinner.hide()
        this.myOffers = response
        this.copymyOffers = response
        if (this.isDirectSaleOffer) {
          this.myOffers = this.copymyOffers?.filter((item) => item.status == 'Active' && item.auctionType == 'Direct Sale' && item.directSaleToken == this.directSaleId)
          if (this.myOffers.length == 0) {
            this.toastr.info('Offer Not Found');
            this.router.navigate(['/market-place']);
          }
          else {
            this.handleListDetails(this.myOffers[0]?.listingId, this.myOffers[0]?.offer_id)
          }
          return
        }
        this.handleFilterList()
      },
      (error: any) => {
        this.spinner.hide()

        console.log(error)
      },
      () => console.log("Done getting active listings"));
  }

  handleChange() {
    const { filterByProject, offerStatus, copymyOffers } = this;
    const isAllProjectSelected = filterByProject === 'all';

    this.myOffers = copymyOffers
      ?.filter(({ status, auctionType, projectId }) =>
        status === offerStatus && auctionType !== 'Direct Sale' && (isAllProjectSelected || projectId === filterByProject)
      );
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
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
        this.myOffers = this.copymyOffers?.filter((item) => item.status === this.offerStatus && item.offer_Status != "Cancelled" && item.auctionType != 'Direct Sale' && !item.isAuctionEnd && !item.isListingStart)
        this.allActiveProjects = this.myOffers?.reduce((acc: any, offer: any) => {
          if (!acc.includes(offer.projectId)) {
            acc.push(offer.projectId)
          }
          return acc
        }, []);
        break;

      default:
        return
    }
  }

  handleConstraint() {

    this.addNewListingService.handleConstraint('buyConstraint').subscribe(
      (response) => {
        this.constraintOptions = response?.map(item => {
          return { ...item, isChecked: false };
        });
      },
      (error: any) => {
        console.log("Error getting buyer Constraint", error)
      },
      () => console.log("Done getting buyer Constraint"));
  }


  handleListDetails(id: number, offerId: any) {
    this.spinner.show()

    this.myListingsService.getMyList(id).subscribe(
      (response) => {
        this.spinner.hide()

        this.listDetails = response
        if (!offerId) {
          this.newOffer.offerAmount = response.minimumAsk
          this.newOffer.id = null
          this.newOffer.contact = null
          this.newOffer.status = null
          this.newOffer.constraints = []
          this.newOffer.comments = ""
        }
      },
      (error: any) => {
        this.spinner.hide()

        console.log("Error getting list details", error)
      },
      () => console.log("Done getting list details"));

    if (offerId) {
      this.spinner.show()
      this.myOffersService.getofferDetails(offerId).subscribe(
        (response) => {
          this.spinner.hide()
          this.newOffer = response
          this.constraintOptions = this.constraintOptions?.map((obj: any) => {
            return {
              id: obj.id,
              constraint: obj.constraint,
              constraintLabel: obj.constraintLabel,
              isChecked: this.newOffer.constraints?.some((item: any) => item.id === obj.id)
            }
          });
        },
        (error: any) => {
          this.spinner.hide()

          console.log("Error getting offer details", error)
        },
        () => console.log("Done getting offer details"));
    }
  }

  handleUpdateOffers() {
    this.getAllMyOffers()
  }

  handleGetStatus() {
    this.addNewListingService.handleGetStatus().subscribe(
      (response) => {
        this.statusOptions = response
      },
      (error: any) => {
        console.log("Error getting status", error)
      },
      () => console.log("Done getting status "));
  }

}
