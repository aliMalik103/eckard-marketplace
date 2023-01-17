import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ListingType, AuctionType, Project, Account, Status, Tract, MyListing } from 'src/components/model/my-listings';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { AddNewListingService } from './add-new-listing.service';


@Component({
  selector: 'app-add-new-listing',
  templateUrl: './add-new-listing.component.html',
  styleUrls: ['./add-new-listing.component.css']
})
export class AddNewListingComponent implements OnInit {
  @Output() onGoBack = new EventEmitter()

  isError: boolean = false
  errorMessages!: any;

  listingTypeOptions!: ListingType[]
  auctionTypeOptions!: AuctionType[]
  constraintOptions!: any[]
  projectsOptions!: Project[]
  accountsOptions!: Account[]
  statusOptions!: Status[]
  tracts!: Tract[]

  createNewListing: MyListing = {
    listing_type: null,
    status: null,
    listingName: '',
    listingStart: null,
    auction_type: '',
    auctionEnd: '',
    comments: '',
    account: null,
    project: null,
    nma: null,
    minimumAsk: null,
    buyNowPrice: null,
    constraints: [],
    offer: []

  }


  constructor(private addNewListingService: AddNewListingService, private myListingsService: MyListingsService, private router: Router) {

  }

  ngOnInit(): void {
    this.handleGetListType()
    this.handleAuctionType()
    this.handleConstraint()
    this.handleGetAllProjects()
    this.handleGetAllAccounts()
    this.handleGetStatus()
    this.handleGetTracts()
    console.log("add new listings service")
  }

  handleGoBack() {
    this.onGoBack.emit()
  }

  handleProjectType(value: number) {
    this.createNewListing.listing_type = value;
    console.log(this.createNewListing.listing_type)

  }

  handleStatus(id: number) {
    this.createNewListing.status = id
    console.log(this.createNewListing)
    this.myListingsService.createNewListing(this.createNewListing).subscribe(
      (response) => {
        console.log(response)
        this.router.navigate(['/market-place'])
      },
      (error: any) => {
        this.isError = true
        this.errorMessages = Object.keys(error.error).map(key => {
          return { key: key, value: error.error[key][0] };
        });

        console.log("this.errorMessages", this.errorMessages)
      },
      () => console.log("Done getting List Type")
    )
  }

  handleGetListType() {

    this.addNewListingService.handleGetListType().subscribe(
      (response) => {
        this.listingTypeOptions = response
      },
      (error: any) => {

        console.log("error", error)
      },
      () => console.log("Done getting List Type"));

  }

  handleAuctionType() {

    this.addNewListingService.handleAuctionType().subscribe(
      (response) => {
        this.auctionTypeOptions = response

      },
      (error: any) => {

        console.log("error", error)
      },
      () => console.log("Done getting auction Type"));

  }

  handleConstraint() {

    this.addNewListingService.handleConstraint().subscribe(
      (response) => {
        this.constraintOptions = response?.map(item => {
          return { ...item, isChecked: false };
        })

      },
      (error: any) => {

        console.log("error", error)
      },
      () => console.log("Done getting constraint Type"));
  }

  handleGetAllProjects() {
    this.addNewListingService.handleGetAllProjects().subscribe(
      (response) => {
        this.projectsOptions = response
      },
      (error: any) => {

        console.log("error", error)
      },
      () => console.log("Done getting handleGetAllAccounts "));
  }

  handleGetAllAccounts() {
    this.addNewListingService.handleGetAllAccounts().subscribe(
      (response) => {
        this.accountsOptions = response
      },
      (error: any) => {

        console.log("error", error)
      },
      () => console.log("Done getting List Type"));
  }

  handleGetStatus() {
    this.addNewListingService.handleGetStatus().subscribe(
      (response) => {
        this.statusOptions = response.reverse()
      },
      (error: any) => {

        console.log("error", error)
      },
      () => console.log("Done getting List Type"));
  }

  handleGetTracts() {
    this.addNewListingService.handleGetTracts().subscribe(
      (response) => {
        this.tracts = response
      },
      (error: any) => {

        console.log("error", error)
      },
      () => console.log("Done getting List Type"));
  }


}