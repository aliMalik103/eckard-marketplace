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
  labels: any = {
    "Account_Number": "Account Number",
    "Bank_Name": "Bank Name",
    "Recipient": "Account Holder",
    "Routing_Number": "Routing Number",
    "City": "City",
    "mailinto":"Mailing TO",
    "country": "Country",
    "State": "State",
    "Streat": "Streat",
    "Zip": "Zip",

  }
  selectedType: any;
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
  methodAssocietedAlready=false
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
  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  associateMethod(item: any) {
    this.spinner.show();


//     this.pendingsTransactions.map((res: any) => {

    
// const hasId= res.fund_transfer_method.filter((re:any)=>parseInt(item.id)==parseInt(re.id));
// alert(JSON.stringify(hasId))


//     })

    this.loginService.associateTransferMethod(

      {
        fund_transfer_method: parseInt(item.id),
        transaction: parseInt(item.transactionId)
      }

    ).subscribe((response: any) => {

      this.pendingsTransactions.map((res: any) => {
        if (res.id == item.transactionId) {
          res.fund_transfer_method.push({ ...response, id: response.fund_transfer_method })
        }
      })
      this.spinner.hide()
    })


  }

  groupBy = function(xs:any, key:any) {
    return xs.reduce(function(rv:any, x:any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  clickTransaction(transaction: any) {
    this.methodAssocietedAlready=false;
    const transferMethods: any = [];

    if (this.transactionStatus === 'Sell') {
      this.spinner.show()
      this.loginService.getAccountMethods(this.loginService.user.id).subscribe((response: any) => {
        response.map((res: any) => {
          res.transactionId = transaction.id;
          const hasMethodAssociated = transaction.fund_transfer_method.filter((account: any) => (parseInt(account.id) == parseInt(res.id)))

          if (hasMethodAssociated.length > 0) {
          this.methodAssocietedAlready=true
            res.current = true
          }

          let methodsInfo: any = {};
          if (res.type == "Check") {
            methodsInfo['Eckard Account'] = res.account.accountName;
            methodsInfo['Account Holder'] = res.json_fields['Recipient'];
            methodsInfo['Mail To'] = res.json_fields['mailto'];
            methodsInfo['Country'] = res.json_fields['country'];
            methodsInfo['Streat'] = res.json_fields['Streat'];
            methodsInfo['City'] = res.json_fields['City'];
            methodsInfo['State'] = res.json_fields['State'];
            methodsInfo['Zip'] = res.json_fields['Zip'];
          }
          else {
            methodsInfo['Eckard Account'] = res.account.accountName;
            methodsInfo['Account Holder'] = res.json_fields['Recipient'];
            methodsInfo['Bank Name'] = res.json_fields['Bank_Name'];
            methodsInfo['Account Number'] = res.json_fields['Account_Number'];
            methodsInfo['ABA Routing Number'] = res.json_fields['Routing_Number'];
          }



          transferMethods.push({
            ...res,
            json_fields: methodsInfo

          })


        })
        this.spinner.hide();
        const groupByType=this.groupBy(transferMethods,"type");
    
        this.accountsMethods = groupByType;
      })
    }
    // alert(JSON.stringify(transaction.account))
  }
  handleGetSellerTransactions() {
    this.myListingsService.handleGetSellerPendingTransactions(this.loginService.user.id).subscribe(
      (response: any) => {

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


        response.map((ress: any) => {

          ress.fund_transfer_method.map((res: any) => {

            let methodsInfo: any = {};
            if (res.type == "Check") {
              methodsInfo['Recipient'] = res.json_fields['Recipient'];
              methodsInfo['Streat'] = res.json_fields['Streat'];
              methodsInfo['City'] = res.json_fields['City'];
              methodsInfo['State'] = res.json_fields['State'];
              methodsInfo['Zip'] = res.json_fields['Zip'];
            }
            else {

              methodsInfo['Recipient'] = res.json_fields['Recipient'];
              methodsInfo['Bank Name'] = res.json_fields['Bank_Name'];
              methodsInfo['Account Number'] = res.json_fields['Account_Number'];
              methodsInfo['ABA Routing Number'] = res.json_fields['Routing_Number'];
            }

            res.json_fields = methodsInfo;

          })





        })

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
