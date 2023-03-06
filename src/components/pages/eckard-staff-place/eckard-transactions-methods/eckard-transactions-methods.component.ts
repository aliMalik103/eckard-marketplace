import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/components/services/login.service';
import { MyListingsService } from 'src/components/services/my-listings.service';

@Component({
  selector: 'app-eckard-transactions-methods',
  templateUrl: './eckard-transactions-methods.component.html',
  styleUrls: ['./eckard-transactions-methods.component.css']
})
export class EckardTransactionsMethodsComponent implements OnInit {

  transactionsMethodsColumns = ['Account', 'Type']
  transactionsMethodData = []
  page: number = 1
  count: number = 0
  tableSize: number = 50
  tableSizes: any = [3, 6, 9, 12]
  searchParam = ''
  transactionsMethodsData!: any
  copyTransactionsData!: any

  constructor(private spinner: NgxSpinnerService, private myListingsService: MyListingsService,
    private loginService: LoginService, private router: Router
  ) {
  }

  ngOnInit(): void {

    if (this.loginService?.user?.status != 'active' || this.loginService?.user?.role?.name != 'Eckard') {
      this.router.navigate(['/market-place'])
      return
    }
    this.handleGetEckardTransactionsMethods()
  }

  handleGetEckardTransactionsMethods() {
    this.spinner.show()

    this.myListingsService.handleGetEckardTransactionsMethods().subscribe(

      (response: any) => {
        this.spinner.hide()
        this.transactionsMethodsData = response
        this.copyTransactionsData = response
        this.handleChange()
      },
      (error: any) => {
        this.spinner.hide()
        console.log("Error getting  Pending Asset Transfer", error)
      },
      () => console.log("Done getting  Pending Asset Transfer "));

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
      this.transactionsMethodsData = this.copyTransactionsData
      return;
    }

    const filteredData = this.copyTransactionsData?.filter((item: any) => {
      const searchParamLower = this.searchParam.toLowerCase(); // convert searchParam to lowercase
      const itemFTMAccountName = item?.account?.accountName?.toLowerCase();
      return itemFTMAccountName.includes(searchParamLower)
        ;
    });

    this.transactionsMethodsData = filteredData
  }

  handleUpdate() {
    this.handleGetEckardTransactionsMethods()

  }

}
