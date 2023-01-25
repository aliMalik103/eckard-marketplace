import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ListingCost, Account, MyListing, Tract, IncomListing, CashConfig } from 'src/components/model/my-listings';
import { AddNewListingService } from '../add-new-listing.service';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { ToastrService } from 'ngx-toastr';



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
  @Input() isListEdit!: boolean
  @Output() isValidNMA = new EventEmitter()

  projectsOptions!: any[]
  incomeListing!: IncomListing
  listingCost!: ListingCost
  cashFlow!: any
  calculateTotalCashFlow: any = 0
  isRecalculate: boolean = false



  basicCashFlow: CashConfig = {
    id: null,
    account: null,
    project: null,
    noOfMonths: 0,
    decline: 0,
    gasPrice: 0,
    oilPrice: 0
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
  constructor(private addNewListingService: AddNewListingService, private myListingsService: MyListingsService, private toastr: ToastrService,) {

  }

  ngOnChanges(): void {
    if (this.accountsOptions?.length == 1) {
      this.handleUserProject(this.accountsOptions[0].id)
    }
    if (this.createNewListing?.account) {
      this.handleUserProject(this.createNewListing.account)
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
        if (this.incomeListing) {
          this.isValidNMA.emit(this.incomeListing.availableNma < parseFloat(this.createNewListing.nma))
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
            this.createNewListing.project = this.projectsOptions[0].project.id;
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
      this.handleGetCashConfig()
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
    let flag = this.incomeListing ? (this.incomeListing.availableNma < parseFloat(this.createNewListing.nma)) : null;
    return flag
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
        if (this.incomeListing) {
          this.isValidNMA.emit(this.incomeListing.availableNma < parseFloat(this.createNewListing.nma))
        }
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
        this.cashFlow = response
      },
      (error: any) => {

        console.error("Error getting listing cost : ", error);
      },
      () => console.log("Done getting listing cost .")
    )
  }

  handleGetCashConfig() {
    this.myListingsService.handleGetCashConfig(this.createNewListing.account, this.createNewListing.project).subscribe(
      (response: any) => {
        if (response.length > 0) {
          this.basicCashFlow.id = response[0].id
          this.basicCashFlow.account = response[0].account.id
          this.basicCashFlow.project = response[0].project.id
          this.basicCashFlow.decline = response[0].decline
          this.basicCashFlow.gasPrice = response[0].gasPrice
          this.basicCashFlow.oilPrice = response[0].oilPrice
          this.basicCashFlow.noOfMonths = response[0].noOfMonths
        }
        else {
          this.basicCashFlow.id = null
          this.basicCashFlow.account = null
          this.basicCashFlow.project = null
          this.basicCashFlow.decline = 0
          this.basicCashFlow.gasPrice = 0
          this.basicCashFlow.oilPrice = 0
          this.basicCashFlow.noOfMonths = 0
        }
      },
      (error: any) => {

        console.error("Error getting listing cost : ", error);
      },
      () => console.log("Done getting listing cost .")
    )
  }
  handleSaveAsDefault(value: any) {
    value.account = this.createNewListing.account
    value.project = this.createNewListing.project
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
        if (response) {
          this.handleGetCashConfig()
        }
        this.toastr.success('CashFlow default values add successfully');

      },
      (error: any) => {

        console.error("Error getting cash Config : ", error);
      },
      () => console.log("Done getting cash Config .")
    )
  }

  handleUpdateCashConfig(body: any) {
    this.myListingsService.handleUpdateCashConfig(body).subscribe(
      (response) => {
        console.log("update cash Config", response)
        if (response) {
          this.handleGetCashConfig()
          this.toastr.success('CashFlow default values update successfully');
        }
      },
      (error: any) => {

        console.error("Error getting cash Config : ", error);
      },
      () => console.log("Done getting cash Config .")
    )
  }


  handleCalculateCashFlow() {
    this.isRecalculate = true
    let gasArray = 0;
    let oilArray = 0;

    for (let i = 1; i <= this.basicCashFlow.noOfMonths; i++) {
      gasArray += this.cashFlow.gas * (1 - (this.basicCashFlow.decline * i) / 100);
      oilArray += this.cashFlow.oil * (1 - (this.basicCashFlow.decline * i) / 100);
    }

    gasArray *= this.basicCashFlow.gasPrice;
    oilArray *= this.basicCashFlow.oilPrice;
    gasArray /= this.cashFlow.totalProjectNma;
    oilArray /= this.cashFlow.totalProjectNma;

    let totalCashFlow = gasArray + oilArray;
    this.calculateTotalCashFlow = totalCashFlow * this.createNewListing.nma;
  }


}
