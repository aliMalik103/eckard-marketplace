import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/components/services/login.service';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { AddNewListingService } from '../../seller/my-listing/add-new-listing/add-new-listing.service';

@Component({
  selector: 'app-eckard-transactions',
  templateUrl: './eckard-transactions.component.html',
  styleUrls: ['./eckard-transactions.component.css']
})
export class EckardTransactionsComponent implements OnInit {

  transactionStatus = ''
  transactionsData!: any
  copyTransactionsData!: any
  statusOptions!: any

  searchParam = ''
  transactionsColumns = ['Trxn ID', 'Seller', 'Buyer', 'Project', 'NMA', 'Status', 'Action(s)']
  page: number = 1
  count: number = 0
  tableSize: number = 50
  tableSizes: any = [3, 6, 9, 12]

  constructor(private activeRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private loginService: LoginService, private router: Router, private toastr: ToastrService,
    private myListingsService: MyListingsService, private addNewListingService: AddNewListingService,


  ) {
  }

  ngOnInit(): void {
    this.spinner.show()

    this.handleGetStatus()
    if (this.loginService?.user?.status != 'active' || this.loginService?.user?.role?.name != 'Eckard') {
      this.router.navigate(['/market-place'])
      return
    }
    let routePath = this.activeRoute.snapshot?.routeConfig?.path
    switch (routePath) {
      case 'eckard-pending-transactions':
        this.transactionStatus = 'pending-transactions'
        this.handleGetEckardTransactions('Pending PSA')
        break
      case 'eckard-completed-transactions':
        this.transactionStatus = 'completed-transactions'
        this.handleGetEckardTransactions('Fund Transfer Confirmed')
        break
      case 'eckard-pending-asset':
        this.transactionStatus = 'pending-asset'
        this.handleGetEckardTransactions('Pending Asset Transfer')
        break

      default:
        return
    }
  }

  toggleTransactions(type: any) {
    this.spinner.show()

    this.transactionStatus = type
    switch (this.transactionStatus) {
      case 'pending-transactions':
        this.handleGetEckardTransactions('Pending PSA')
        break
      case 'completed-transactions':
        this.handleGetEckardTransactions('Fund Transfer Confirmed')

        break
      case 'pending-asset':
        this.handleGetEckardTransactions('Pending Asset Transfer')

        break

      default:
        return
    }
  }

  handleGetEckardTransactions(status: string) {

    this.myListingsService.handleGetEckardTransactions(status).subscribe(
      (response) => {
        this.spinner.hide()
        this.transactionsData = response
        this.copyTransactionsData = response
        this.handleChange()

      },
      (error: any) => {
        this.spinner.hide()
        console.log("Error getting  status", error)
      },
      () => console.log("Done getting  status "));
  }

  handleUpdateEckardTransactions(transaction: any, type: any) {
    this.spinner.show()

    if (type == 'Pending PSA') {
      transaction.status = this.statusOptions?.find((item: any) => item.status === "PSA Executed");
    }
    else if (type == 'Fund Transfer Confirmed') {
      transaction.status = this.statusOptions?.find((item: any) => item.status === "Pending Asset Transfer");
    }
    else if (type == 'Pending Asset Transfer') {
      transaction.status = this.statusOptions?.find((item: any) => item.status === "Assets Transferred");
    }

    this.myListingsService.handleUpdateEckardTransactions(transaction).subscribe(
      (response: any) => {
        this.handleGetEckardTransactions(type)
        this.toastr.success(`Transaction Status Update Successfully`)

      },
      (error: any) => {
        this.spinner.hide()
        console.log("Error getting Update Eckard Transactions", error)
      },
      () => console.log("Done getting Update Eckard Transactions "));

  }

  onTableDataChange(event: any) {
    this.page = event
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value
    this.page = 1
  }

  handleChange() {
    if (!this.searchParam) {
      this.transactionsData = this.copyTransactionsData
      return;
    }

    const filteredData = this.copyTransactionsData?.filter((item: any) => {
      const searchParamLower = this.searchParam.toLowerCase(); // convert searchParam to lowercase

      const itemListingAccountContactFirstName = item?.listing?.account?.contact?.mpName?.toLowerCase();
      const itemOfferContactFirstName = item?.offer?.contact?.mpName?.toLowerCase();
      const itemListingProjectProjectId = item?.listing?.project?.projectId?.toLowerCase();

      return itemListingAccountContactFirstName.includes(searchParamLower)
        || itemOfferContactFirstName.includes(searchParamLower)
        || itemListingProjectProjectId.includes(searchParamLower);
    });

    this.transactionsData = filteredData
  }

  handleLength(array: any) {
    if (array && array.length > 0) {
      return true
    }
    return false
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
}
