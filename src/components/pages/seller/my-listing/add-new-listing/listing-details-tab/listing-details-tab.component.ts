import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { ListingCost, Account, MyListing, Tract, IncomListing, CashConfig, Project } from 'src/components/model/my-listings';
import { AddNewListingService } from '../add-new-listing.service';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/components/services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';



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
  @Input() offerConfirmMessages!: any
  @Output() isValidNMA = new EventEmitter()

  projectsOptions: Project[] = []
  incomeListing!: IncomListing
  listingCost!: ListingCost
  cashFlow!: any
  calculateTotalCashFlow: any = 0
  isRecalculate: boolean = false
  cashFlowStatus: string = ''
  isDefaults: boolean = false

  basicCashFlow: any = {
    id: null,
    months: null,
    decline: null,
    gas: null,
    oil: null,
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
    private loginService: LoginService, private spinner: NgxSpinnerService) {
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
      case 'buyNowPrice':
        this.createNewListing.buyNowPrice = parseFloat(this.createNewListing.buyNowPrice);
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
        this.createNewListing.nma = this.createNewListing.nma || this.incomeListing.availableNma;
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
          this.isDefaults = false
          this.cashFlowStatus = 'Defaults'
          this.basicCashFlow.id = response[0].id
          this.basicCashFlow.contact = response[0].contact.id
          this.basicCashFlow.months = response[0].json_fields.months;
          this.basicCashFlow.decline = response[0].json_fields.decline;
          this.basicCashFlow.oil = response[0].json_fields.oil;
          this.basicCashFlow.gas = response[0].json_fields.gas;

        }
        else {
          if (this.isDefaults) {
            this.toastr.info('CashFlow Defaults Value does not exist')
          }
          this.isDefaults = false

          this.cashFlowStatus = 'Standard'
          let standard = this.offerConfirmMessages?.filter((item: any) => item.key.endsWith('Standard'))
          this.handleBasicCashFlow(standard)
        }
      },
      (error: any) => {

        console.error("Error getting listing cost : ", error);
      },
      () => console.log("Done getting listing cost .")
    )
  }
  handleSaveAsDefault(value: any) {
    this.spinner.show()
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
        this.spinner.hide()
        if (response) {
          this.handleGetCashConfig()
        }
        this.toastr.success('CashFlow default values add successfully');

      },
      (error: any) => {
        this.spinner.hide()

        console.error("Error getting cash Config : ", error);
      },
      () => console.log("Done getting cash Config .")
    )
  }

  handleUpdateCashConfig(body: any) {
    this.myListingsService.handleUpdateCashConfig(body).subscribe(
      (response) => {
        this.spinner.hide()
        if (response) {
          this.handleGetCashConfig()
          this.toastr.success('CashFlow default values update successfully');
        }
      },
      (error: any) => {
        this.spinner.hide()

        console.error("Error getting cash Config : ", error);
      },
      () => console.log("Done getting cash Config .")
    )
  }

  handleCalculateCashFlow() {
    this.isRecalculate = true
    this.calculateTotalCashFlow = this.myListingsService.handleCalculateCashFlow(this.basicCashFlow, this.cashFlow, this.createNewListing);
  }


  toggleCashFlow(type: any) {
    this.cashFlowStatus = type
    switch (this.cashFlowStatus) {
      case 'Conservative':
        let conservative = this.offerConfirmMessages?.filter((item: any) => item.key.endsWith('Conservative'))
        this.handleBasicCashFlow(conservative)

        break;
      case 'Standard':
        let standard = this.offerConfirmMessages?.filter((item: any) => item.key.endsWith('Standard'))
        this.handleBasicCashFlow(standard)
        break;
      case 'Assertive':
        let assertive = this.offerConfirmMessages?.filter((item: any) => item.key.endsWith('Assertive'))
        this.handleBasicCashFlow(assertive)
        break;
      case 'Defaults':
        this.isDefaults = true
        this.handleGetCashConfig()
        break;

      default:
        return
    }

  }

  handleBasicCashFlow(obj: any) {
    const value1Object = obj && obj[0] && JSON.parse(obj[0]?.value1);
    this.basicCashFlow.id = this.basicCashFlow?.id ? this.basicCashFlow.id : null
    this.basicCashFlow.contact = this.basicCashFlow?.contact ? this.basicCashFlow.contact : null
    this.basicCashFlow.months = value1Object?.months;
    this.basicCashFlow.decline = value1Object?.decline;
    this.basicCashFlow.oil = value1Object?.oil;
    this.basicCashFlow.gas = value1Object?.gas;

  }
}
