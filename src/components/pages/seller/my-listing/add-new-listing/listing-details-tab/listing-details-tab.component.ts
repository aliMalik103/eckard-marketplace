import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { ListingCost, Account, MyListing, Tract, IncomListing, CashConfig, Project } from 'src/components/model/my-listings';
import { AddNewListingService } from '../add-new-listing.service';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/components/services/login.service';



@Component({
  selector: 'app-listing-details-tab',
  templateUrl: './listing-details-tab.component.html',
  styleUrls: ['./listing-details-tab.component.css'],

})
export class ListingDetailsTabComponent implements OnInit, OnChanges {

  @Input() accountsOptions!: Account[]
  @Input() createNewListing!: MyListing
  @Input() tracts!: Tract[]
  @Input() isListDraft!: boolean
  @Input() isListEdit!: boolean
  @Output() isValidNMA = new EventEmitter()

  projectsOptions: Project[] = []
  incomeListing!: IncomListing
  listingCost!: ListingCost
  cashFlow!: any
  calculateTotalCashFlow: any = 0
  isRecalculate: boolean = false


  basicCashFlow: CashConfig = {
    id: null,
    noOfMonths: 36,
    decline: 1.5,
    gasPrice: 3.5,
    oilPrice: 75,
    contact: null
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
  constructor(private addNewListingService: AddNewListingService,
    private myListingsService: MyListingsService, private toastr: ToastrService,
    private loginService: LoginService) {
  }
  ngOnInit(): void {
    if (this.createNewListing?.account) {
      this.handleUserProject(this.createNewListing.account)
    }
  }
  ngOnChanges(): void {
    if (this.accountsOptions?.length == 1) {
      this.handleUserProject(this.accountsOptions[0].id)
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
      case 'immediatePrice':
        this.createNewListing.immediatePrice = parseFloat(this.createNewListing.immediatePrice);
        break;
      default:
        return
    }
  }

  handleUserProject(id: number) {

    this.myListingsService.handleGetProjects(id).subscribe(
      (response) => {
        if (response.length == 0) {
          this.toastr.info('No projects associated with this account')
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
              return acc;
            }
          }, []);


          this.myListingsService.userAccountsAndProjects = uniqueProjects
          this.projectsOptions = uniqueProjects.map((item: any) => item.project);
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
    this.myListingsService.handleGetCashConfig(this.loginService.user.id).subscribe(
      (response: any) => {
        if (response.length > 0) {
          this.basicCashFlow.id = response[0].id
          this.basicCashFlow.contact = response[0].contact.id
          this.basicCashFlow.decline = response[0].decline
          this.basicCashFlow.gasPrice = response[0].gasPrice
          this.basicCashFlow.oilPrice = response[0].oilPrice
          this.basicCashFlow.noOfMonths = response[0].noOfMonths
        }
        else {
          this.basicCashFlow.id = null
          this.basicCashFlow.contact = null
          this.basicCashFlow.decline = 1.5
          this.basicCashFlow.gasPrice = 3.5
          this.basicCashFlow.oilPrice = 75
          this.basicCashFlow.noOfMonths = 36
        }
      },
      (error: any) => {

        console.error("Error getting listing cost : ", error);
      },
      () => console.log("Done getting listing cost .")
    )
  }
  handleSaveAsDefault(value: any) {
    value.contact = this.loginService.user.id
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
    this.calculateTotalCashFlow = this.myListingsService.handleCalculateCashFlow(this.basicCashFlow, this.cashFlow, this.createNewListing);
  }


}
