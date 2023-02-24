import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/components/model/my-listings';
import { LoginService } from 'src/components/services/login.service';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { AddNewListingService } from '../seller/my-listing/add-new-listing/add-new-listing.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css']
})
export class TransactionsComponent implements OnInit {

    @Input() transactionStatus!: any;
    page: number = 1;
    labels:any={
      "Account_Number":"Account Number",
      "Bank_Name":"Bank Name",
      "Recipient":"Recipient",
      "Routing_Number":"Routing Number",
      "City":"City",
      "Country_Code":"Country Code",
      "State":"State",
      "Streat":"Streat",
      "Zip":"Zip",

    }
    count: number = 0;
    tableSize: number = 50;
    tableSizes: any = [3, 6, 9, 12];
    myTransactions: any = [];
    transactionColumns: string[] = [];
    listDetails = []
    offer = []
    newOffer = []
    methodsColumns: Array<String> = [
    
      "Method Type",
      "Method Information",
   
    ]
    constraintOptions!: any[]
    statusOptions!: Status[]
    accountsMethods: any = []
    pendingsTransactions!: any



    constructor(private addNewListingService: AddNewListingService,
        private myListingsService: MyListingsService, private loginService: LoginService, private spinner: NgxSpinnerService
    ) { }

    ngOnInit(): void {
        this.updateTransactionColumns();
        this.handleConstraint()
        this.handleGetStatus()
    }

    updateTransactionColumns() {
        if (this.transactionStatus === 'Sell') {
            this.spinner.show()

            this.transactionColumns = ['Type', 'Project', 'NMA', 'Price', 'Buyer', 'Action', 'Status', 'Progress'];
            this.handleGetSellerTransactions()
        } else {
            this.spinner.show()

            this.handleGetBuyingTransactions()
            this.transactionColumns = ['Type', 'Project', 'NMA', 'Price', 'Seller', 'Action', 'Status', 'Progress'];
        }
    }
    objectKeys(obj:any) {
      return Object.keys(obj);
  }
    clickTransaction(transaction:any){
     if(this.transactionStatus === 'Sell'){
      this.loginService.getAccountMethods(parseInt(transaction.account.id)).subscribe((response) => {
        this.accountsMethods=response;
   
      })
    }
      // alert(JSON.stringify(transaction.account))
    }
    handleGetSellerTransactions() {
        this.myListingsService.handleGetSellerPendingTransactions(this.loginService.user.id).subscribe(
            (response) => {
             
                this.spinner.hide()

                this.pendingsTransactions = response

            },
            (error: any) => {
                this.spinner.hide()

                console.log("Error getting list details", error)
            },
            () => console.log("Done getting list details"));
    }

    handleGetBuyingTransactions() {
        this.myListingsService.handleGetBuyerPendingTransactions(this.loginService.user.id).subscribe(
            (response) => {
                this.spinner.hide()

                this.pendingsTransactions = response

            },
            (error: any) => {
                this.spinner.hide()

                console.log("Error getting list details", error)
            },
            () => console.log("Done getting list details"));
    }

    toggleListing(type: any) {
        this.transactionStatus = type;
        this.updateTransactionColumns();
    }

    onTableDataChange(event: any) {
        this.page = event;
    }

    onTableSizeChange(event: any): void {
        this.tableSize = event.target.value;
        this.page = 1;
    }

    handleMyTransactionsLength() {
        if (this.pendingsTransactions) {
            return this.pendingsTransactions.length;
        }
        return 0;
    }

    handleConstraint() {

        this.addNewListingService.handleConstraint().subscribe(
            (response) => {
                const buyOptions: any = [];
                response?.map(item => {
                    if (item.buyLabel) {
                        buyOptions.push({ ...item, isChecked: false });
                    }
                });
                this.constraintOptions = buyOptions;
            },
            (error: any) => {

                console.log("Error getting buyer Constraint", error)
            },
            () => console.log("Done getting buyer Constraint"));
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

    handleUpdateOffers() {
    }
}
