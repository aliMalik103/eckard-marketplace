import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constraint, Status } from 'src/components/model/my-listings';
import { MyOffers } from 'src/components/model/my-offer';
import { LoginService } from 'src/components/services/login.service';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { MyOffersService } from 'src/components/services/my-offers.service';
import { AddNewListingService } from '../../seller/my-listing/add-new-listing/add-new-listing.service';

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.css']
})
export class MyBidsComponent implements OnInit {

  filterByProject: string = ''
  type = 'Silent- Minimum Ask'
  statusOptions!: Status[]


  page: number = 1;
  count: number = 0;
  tableSize: number = 50;
  tableSizes: any = [3, 6, 9, 12];
  testMyOffer = []
  myOffers!: MyOffers[];
  constraintOptions!: any
  listDetails!: any


  newOffer: any = {
    id: null,
    contact: null,
    status: null,
    constraints: [],
    comments: "",
    offerAmount: 0
  }
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
    private myOffersService: MyOffersService, private addNewListingService: AddNewListingService, private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    if (this.loginService?.user?.status != "active" || this.loginService?.user?.role?.name == 'Eckard') {
      this.router.navigate(['/market-place']);
      return

    }
    this.handleConstraint()
    this.getAllMyOffers()
    this.handleGetStatus()
  }

  getAllMyOffers() {
    this.spinner.show()
    this.myOffersService.getAllMyOffers(this.loginService.user.id).subscribe(
      (response) => {
        this.spinner.hide()

        this.myOffers = response?.filter((item: any) => item.offerAmount != null && item.status == "Active" && item.offer_Status == "Active" && item.auctionType != 'Direct Sale' && !item.isAuctionEnd && !item.isListingStart)
      },
      (error: any) => {
        this.spinner.hide()

        console.log(error)
      },
      () => console.log("Done getting all my active offers"));
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


  handleConstraint() {

    this.addNewListingService.handleConstraint().subscribe(
      (response) => {
        const buyOptions: any = [];
        response?.map(item => {
          if (item.buyLabel) {
            buyOptions.push({ ...item, isChecked: false });
          }
        });
        this.constraintOptions = buyOptions;
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
              buyLabel: obj.buyLabel,
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
        console.log("Error getting  status", error)
      },
      () => console.log("Done getting  status "));
  }

}
