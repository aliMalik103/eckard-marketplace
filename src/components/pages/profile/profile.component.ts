import { LoginService } from 'src/components/services/login.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ListingType, AuctionType, Project, Account, Status, Tract, MyListing, ContactAccount } from 'src/components/model/my-listings';
import { MyListingsService } from 'src/components/services/my-listings.service';

export interface Profile {
  id: any
  firstName: string
  lastName: any

  email: any
  notification: boolean
  mpStatus: any
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  isPassword: boolean = false
  isConfirmPassword: boolean = false
  imageChangedEvent: any = '';
  selectedType: any;
  addAccount=false
  showCropper = false;
  showExisting=false;
  accountsOptions!: Account[]


  accountsTypes: any = ["Check", "Wire"]
  selectAccount: any
  profile: Profile = {
    id: null,
    firstName: "",
    lastName: '',
    email: "",
    notification: false,
    mpStatus: ''
  }
  accountsMethods: any = []
  methods: any = {

  }

  countryOptions=[
    "BHS",
"BRB",
"BLZ",
"CAN",
"CHE",
"CYM",
"CUW",
"DEU",
"FRA",
"HTI",
"HKG",
"ISL",
"ISR",
"JAM",
"JPN",
"KOR",
"MAF",
"MEX",
"PAN",
"PRI",
"SGP",
"TWN",
"USA",


  ];
  constructor(private loginService: LoginService, private spinner: NgxSpinnerService, private myListingsService: MyListingsService,
    private toastr: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
    this.profileDetails()
    this.handleGetUserAccounts()
    this.getAccountMethods();

  }


  clickShowExisting(){

    this.showExisting=!this.showExisting
  }

  clickAddAccount(){

    this.addAccount=!this.addAccount;
  }
  handleCountryChange(item:any){
this.methods.country=item;

  }

   groupBy = function(xs:any, key:any) {
    return xs.reduce(function(rv:any, x:any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  getAccountMethods() {
    const transferMethods :any= [];
    this.loginService.getAccountMethods(this.loginService.user.id).subscribe((response: any) => {
     
      response.map((res: any) => {
        let methodsInfo :any= {};
        if (res.type == "Check") {
          methodsInfo['Account Holder']=res.json_fields['Recipient'];
          methodsInfo['Mail To']=res.json_fields['mailto'];
          methodsInfo['Country']=res.json_fields['country'];
          methodsInfo['Streat']=res.json_fields['Streat'];
          methodsInfo['City']=res.json_fields['City'];
          methodsInfo['State']=res.json_fields['State'];
          methodsInfo['Zip']=res.json_fields['Zip'];
        }
        else {
         
          methodsInfo['Account Holder']=res.json_fields['Recipient'];
          methodsInfo['Bank Name']=res.json_fields['Bank_Name'];
          methodsInfo['Account Number']=res.json_fields['Account_Number'];
          methodsInfo['ABA Routing Number']=res.json_fields['Routing_Number'];
        }
      


        transferMethods.push({
         ...res,
         json_fields:methodsInfo
          
        })

      })
      const groupByType=this.groupBy(transferMethods,"type");
    
      this.accountsMethods = groupByType;

    })
  }
  handleSubmit() {
    this.updateProfileDetails(this.profile)
  }


  objectKeys(obj: any) {
    return Object.keys(obj);
  }


  handleAccountSubmit() {
    this.spinner.show()

    const body = {
      type: this.selectedType,
      account: parseInt(this.selectAccount),
      json_fields: this.methods
    }


    this.loginService.addTransactionMethod(body).subscribe(
      (response) => {
        // this.methods = {};

        this.spinner.hide();
        this.getAccountMethods()
        this.toastr.success('Account Method Added Successfully!');

      })

  }






  handleGetUserAccounts() {
    this.myListingsService
      .handleGetUserAccounts(this.loginService.user.id)
      .subscribe(
        response => {
          this.accountsOptions = response
          if (this.accountsOptions.length == 1) {
            this.selectAccount = this.accountsOptions[0].id;
            this.getAccountMethods()
          }
        },
        (error: any) => {
          console.error('Error getting accounts: ', error)
        },
        () => console.log('Done getting accounts.')
      )
  }

  handleChange(value: string) {
    switch (value) {
      case 'account':
        this.methods.account_id = this.selectAccount;

        // this.getAccountMethods()

        break;
      case 'type':
        this.methods.type = this.selectedType
        break;
      default:
        return
    }
  }

  profileDetails() {
    this.spinner.show()

    this.loginService.profileDetails(this.loginService?.user?.id).subscribe(
      (response) => {
        this.spinner.hide()
        if (response) {
          this.profile.email = response?.email
          this.profile.id = response?.id
          this.profile.firstName = response?.firstName
          this.profile.lastName = response?.lastName
          this.profile.mpStatus = response?.mpStatus
          this.profile.notification = response.notification
        }
      },
      (error: any) => {
        this.spinner.hide()

        console.log("error", error)
      },
      () => console.log("Done getting user"));
  }

  updateProfileDetails(body: any) {
    this.spinner.show()

    this.loginService.updateProfileDetails(body).subscribe(
      (response) => {
        this.spinner.hide()
        this.toastr.success('Profile Update Successfully');
        this.router.navigate(['/market-place']);
        if (response) {

          this.profile.email = response?.email
          this.profile.id = response?.id
          this.profile.firstName = response?.firstName
          this.profile.lastName = response?.lastName
          this.profile.mpStatus = response?.mpStatus
          this.profile.notification = response.notification
        }
      },
      (error: any) => {
        this.spinner.hide()
        this.toastr.error('Something went wrong');
        console.log("error", error)
      },
      () => console.log("Done getting user"));
  }

}

