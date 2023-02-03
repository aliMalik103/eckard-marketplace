import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private myOffersService: MyOffersService, private addNewListingService: AddNewListingService) {

  }

  ngOnInit(): void {
    if (this.loginService.user.status != "active") {
      this.router.navigate(['/market-place']);
      return

    }
    this.handleConstraint()
    this.getAllMyOffers()
    this.handleGetStatus()
  }

  getAllMyOffers() {
    this.myOffersService.getAllMyOffers(this.loginService.user.id).subscribe(
      (response) => {
        const unique = [...new Map(response.map((item: any) =>
          [item['listingId'], item])).values()];

        this.myOffers = unique && unique?.filter((item) => item.offerAmount != null)

      },
      (error: any) => console.log(error),
      () => console.log("Done getting my offers"));
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

    this.addNewListingService.handleConstraint('buyConstraint').subscribe(
      (response) => {
        this.constraintOptions = response?.map(item => {
          return { ...item, isChecked: false };
        });
      },
      (error: any) => {

        console.log("Error getting listing Constraint", error)
      },
      () => console.log("Done getting listing Constraint"));
  }


  handleListDetails(id: number, offerId: any) {

    this.myListingsService.getMyList(id).subscribe(
      (response) => {
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

        console.log("Error getting listing Constraint", error)
      },
      () => console.log("Done getting listing Constraint"));

    if (offerId) {
      this.myOffersService.getofferDetails(offerId).subscribe(
        (response) => {
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

          console.log("Error getting listing Constraint", error)
        },
        () => console.log("Done getting listing Constraint"));
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

        console.log("Error getting listing status", error)
      },
      () => console.log("Done getting listing status "));
  }

}
