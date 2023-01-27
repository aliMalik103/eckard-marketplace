import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyOffers } from 'src/components/model/my-offer';
import { LoginService } from 'src/components/services/login.service';
import { MyOffersService } from 'src/components/services/my-offers.service';
import { AddNewListingService } from '../../seller/my-listing/add-new-listing/add-new-listing.service';

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.css']
})
export class MyBidsComponent implements OnInit {

  offerStatus: string = 'all';
  filterByProject: string = ''
  type = 'Silent- Minimum Ask'

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
    account: null,
    status: null,
    constraints: [],
    comments: "",
    offerAmount: 0
  }

  offersFilterOptions: any = [
    {
      value: "all",
      label: "My Offers"
    },
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
  constructor(private router: Router, private loginService: LoginService,
    private myOffersService: MyOffersService, private addNewListingService: AddNewListingService) {

  }

  ngOnInit(): void {
    if (this.loginService.user.status != "active") {
      this.router.navigate(['/market-place']);
      return

    }
    this.getAllMyOffers()
    this.handleConstraint()
  }

  getAllMyOffers() {
    this.myOffersService.getAllMyOffers(this.loginService.user.id).subscribe(
      (response) => {
        this.myOffers = response
        this.copymyOffers = response
        this.handleFilterList()
      },
      (error: any) => console.log(error),
      () => console.log("Done getting my listings"));
  }

  handleChange() {
    this.myOffers = this.copymyOffers?.filter((item) => item.status === this.offerStatus && item.auctionType != 'Direct Sale' && item.projectId == this.filterByProject)
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  handleLength(array: any) {
    if (array) {
      return true
    }
    return false
  }

  handleFilterList() {
    this.filterByProject = ''
    this.allActiveProjects = []
    switch (this.offerStatus) {
      case 'all':
        this.myOffers = this.copymyOffers
        break;
      case 'Active':
        this.myOffers = this.copymyOffers?.filter((item) => item.status === this.offerStatus && item.auctionType != 'Direct Sale')
        this.allActiveProjects = this.myOffers.reduce((acc: any, offer: any) => {
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

    this.addNewListingService.handleConstraint().subscribe(
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

    this.myOffersService.getListDetails(id).subscribe(
      (response) => {
        this.listDetails = response
      },
      (error: any) => {

        console.log("Error getting listing Constraint", error)
      },
      () => console.log("Done getting listing Constraint"));

    if (offerId) {
      this.myOffersService.getofferDetails(id).subscribe(
        (response) => {
          this.newOffer = response
          this.constraintOptions = this.constraintOptions.map((obj: any) => {
            return {
              id: obj.id,
              constraint: obj.constraint,
              isChecked: this.newOffer.constraints.some((item: any) => item.id === obj.id)
            }
          });

        },
        (error: any) => {

          console.log("Error getting listing Constraint", error)
        },
        () => console.log("Done getting listing Constraint"));
    }
  }

}
