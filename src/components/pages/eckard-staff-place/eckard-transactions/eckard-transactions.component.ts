import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/components/services/login.service';
import { MyListingsService } from 'src/components/services/my-listings.service';

@Component({
  selector: 'app-eckard-transactions',
  templateUrl: './eckard-transactions.component.html',
  styleUrls: ['./eckard-transactions.component.css']
})
export class EckardTransactionsComponent implements OnInit {

  transactionStatus = ''
  transactionsData!: any
  copyTransactionsData!: any

  searchParam = ''
  transactionsColumns = ['Trxn ID', 'Seller', 'Buyer', 'Project', 'NMA', 'Status', 'Action(s)']
  page: number = 1
  count: number = 0
  tableSize: number = 50
  tableSizes: any = [3, 6, 9, 12]

  constructor(private activeRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private loginService: LoginService, private router: Router, private myListingsService: MyListingsService,


  ) {
  }

  ngOnInit(): void {
    this.spinner.show()

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
    this.handleGetEckardTransactions('Fund Transfer Complete')
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
      this.handleGetEckardTransactions('Fund Transfer Complete')

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

    const itemListingAccountContactFirstName = item?.listing?.account?.contact?.firstName?.toLowerCase();
    const itemOfferContactFirstName = item?.offer?.contact?.firstName?.toLowerCase();
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

}
