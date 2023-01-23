import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ListingCost, Account, MyListing, Tract, IncomListing } from 'src/components/model/my-listings';
import { AddNewListingService } from '../add-new-listing.service';
import { MyListingsService } from 'src/components/services/my-listings.service';


@Component({
  selector: 'app-listing-details-tab',
  templateUrl: './listing-details-tab.component.html',
  styleUrls: ['./listing-details-tab.component.css'],

})
export class ListingDetailsTabComponent implements OnChanges {

  @Input() accountsOptions!: Account[]
  @Input() createNewListing!: MyListing
  @Input() tracts!: Tract[]
  @Input() isListDraft!: boolean
  @Output() isValidNMA = new EventEmitter()

  projectsOptions!: any[]
  incomeListing!: IncomListing
  listingCost!: ListingCost
  cashFlow!: any
  calculateTotalCashFlow: any = 0



  basicCashFlow: any = {
    noOfMonths: 36,
    expDecline: 1.5,
    oilPrice: 75.00,
    gasPrice: 3.5
  }

  listingColumns: Array<string> = [
    'Location',
    'Project',
    'County,State',
    'Wells',
    'Royalty',
    'Income',
    'my NMA',
    'Listed NMA',
    '',
    'Listed Inc.'
  ]
  constructor(private addNewListingService: AddNewListingService, private myListingsService: MyListingsService) {

  }

  ngOnChanges(): void {
    if (this.accountsOptions?.length == 1) {
      this.handleUserProject(this.accountsOptions[0].id)
    }
    if (this.createNewListing?.account) {
      this.handleUserProject(this.createNewListing.account)
    }
    if (this.listingCost) {
      this.isValidNMA.emit(this.listingCost.totalNma < parseFloat(this.createNewListing.nma))
    }
  }

  handleChange(value: string) {
    switch (value) {
      case 'account':
        this.createNewListing.account = parseInt(this.createNewListing.account);
        this.handleUserProject(this.createNewListing.account)
        break;
      case 'project':
        this.createNewListing.project = parseInt(this.createNewListing.project);
        this.handleFindTotalNMA()
        break;
      case 'nma':
        this.createNewListing.nma = parseFloat(this.createNewListing.nma);
        if (this.listingCost) {
          this.isValidNMA.emit(this.listingCost.totalNma < parseFloat(this.createNewListing.nma))
        }
        break;
      case 'minimumAsk':
        this.createNewListing.minimumAsk = parseFloat(this.createNewListing.minimumAsk);
        break;
      default:
        return
    }
    console.log(this.createNewListing)
  }

  handleUserProject(id: number) {

    this.myListingsService.handleGetProjects(id).subscribe(
      (response) => {
        if (response.length == 0) {
          this.createNewListing.project = ''
          this.myListingsService.userAccountsAndProjects = []
          this.projectsOptions = []
        }
        else {

          const uniqueProjects = response?.reduce((acc: any, current: any) => {
            const x = acc.find((item: any) => item.project.id === current.project.id && item.project.projectId === current.project.projectId);
            if (!x) {
              return [...acc, current];
            } else {
              x.project.totalNma = (parseFloat(x.project.totalNma) + parseFloat(current.project.totalNma)).toFixed(2).toString();
              x.acquiredNma = (parseFloat(x.acquiredNma) + parseFloat(current.acquiredNma)).toFixed(2).toString();
              x.project.totalRevenue = (parseFloat(x.project.totalRevenue) + parseFloat(current.project.totalRevenue)).toFixed(2).toString();
              return acc;
            }
          }, []);


          this.myListingsService.userAccountsAndProjects = uniqueProjects
          this.projectsOptions = uniqueProjects;

          if (this.projectsOptions.length === 1) {
            this.createNewListing.project = this.projectsOptions[0].id;
            this.handleFindTotalNMA()
          }
          else {
            this.handleFindTotalNMA()
          }
        }
      },
      (error: any) => {

        console.log("error", error)
      },
      () => console.log("Done getting List Type")
    )

  }

  handleFindTotalNMA() {
    if (this.createNewListing.account && this.createNewListing.project) {
      this.handleGetListingCost()
      this.handleGetIncomeListing()
      this.handleGetCashFlow()
    }
  }

  handleRemoveAndAddClass() {
    this.addNewListingService.handleRemoveAndAddClass()
  }

  handleTractLength() {
    if (this.tracts) {
      return this.tracts.length
    }
    return 0;
  }

  handleProjectLength() {
    if (this.projectsOptions) {
      return this.projectsOptions.length
    }
    return 0;
  }

  handleIsValidNma() {
    return this.listingCost ? (this.listingCost.totalNma < parseFloat(this.createNewListing.nma)) : null;
  }

  handleGetListingCost() {
    this.myListingsService.handleGetListingCost(this.createNewListing.account, this.createNewListing.project).subscribe(
      (response) => {
        this.listingCost = response
      },
      (error: any) => {

        console.error("Error getting listing cost : ", error);
      },
      () => console.log("Done getting listing cost .")
    )
  }

  handleGetIncomeListing() {
    this.myListingsService.handleGetIncomeListing(this.createNewListing.account, this.createNewListing.project).subscribe(
      (response) => {
        this.incomeListing = response
      },
      (error: any) => {

        console.error("Error getting listing cost : ", error);
      },
      () => console.log("Done getting listing cost .")
    )
  }

  handleGetCashFlow() {
    this.myListingsService.handleGetCashFlow(this.createNewListing.project).subscribe(
      (response) => {
        console.log("cash flow", response)
        this.cashFlow = response
      },
      (error: any) => {

        console.error("Error getting listing cost : ", error);
      },
      () => console.log("Done getting listing cost .")
    )
  }


  handleCalculateCashFlow() {
    if (!this.basicCashFlow.noOfMonths || !this.basicCashFlow.expDecline || !this.basicCashFlow.oilPrice || !this.basicCashFlow.gasPrice) {
      return;
    }

    let gasArray = 0;
    let oilArray = 0;

    for (let i = 1; i <= this.basicCashFlow.noOfMonths; i++) {
      gasArray += this.cashFlow.gas * (1 - (this.basicCashFlow.expDecline * i) / 100);
      oilArray += this.cashFlow.oil * (1 - (this.basicCashFlow.expDecline * i) / 100);
    }

    gasArray *= this.basicCashFlow.gasPrice;
    oilArray *= this.basicCashFlow.oilPrice;

    let totalCashFlow = gasArray + oilArray;
    this.calculateTotalCashFlow = (totalCashFlow / this.cashFlow.totalProjectNma) * this.createNewListing.nma;
  }


}
