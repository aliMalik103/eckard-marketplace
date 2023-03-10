import { LoginService } from 'src/components/services/login.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ListingType, AuctionType, Project, Account, Status, Tract, MyListing, ContactAccount } from 'src/components/model/my-listings';
import { MyListingsService } from 'src/components/services/my-listings.service';
import { MyOffersService } from 'src/components/services/my-offers.service';

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
  isShow: boolean = false
  isConfirmPassword: boolean = false
  imageChangedEvent: any = '';
  selectedType: any;
  addAccount = false
  showCropper = false;
  showExisting = false;
  accountsOptions!: Account[]
  showData!: boolean[];
  showData1!: boolean[];
  offerConfirmMessages!: any
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
  offerDisclaimer!: any
  deleteFTM = false
  deleteFTMethod!: any

  countryOptions = [
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
  constructor(private loginService: LoginService, private spinner: NgxSpinnerService, private myListingsService: MyListingsService, private myOffersService: MyOffersService,
    private toastr: ToastrService, private router: Router) {
    this.showData = [];
    this.showData1 = [];

  }

  ngOnInit(): void {
    this.handleOfferDealMessages()
    this.profileDetails()
    this.handleGetUserAccounts()
    this.getAccountMethods();

  }


  clickShowExisting() {

    this.showExisting = !this.showExisting
  }

  clickAddAccount() {

    this.addAccount = !this.addAccount;
    this.methods = {};
    this.selectAccount = ''
    this.selectedType = ''
  }

  handleCountryChange(item: any) {
    this.methods.country = item;
  }

  groupBy = function (xs: any, key: any) {
    return xs.reduce(function (rv: any, x: any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  getAccountMethods() {
    this.spinner.show()
    const transferMethods: any = [];
    this.loginService.getAccountMethods(this.loginService.user.id).subscribe((response: any) => {

      response.map((res: any) => {

        let methodsInfo: any = {};
        if (res.type == "Check") {
          methodsInfo['Eckard Account'] = res.account.accountName;
          methodsInfo['Account Holder'] = res.json_fields['Recipient'];
          let mailTo = '';
          if (res.json_fields['mailto']) {
            mailTo += res.json_fields['mailto'] + ', ';
          }
          if (res.json_fields['Street']) {
            mailTo += res.json_fields['Street'] + ', ';
          }
          if (res.json_fields['City']) {
            mailTo += res.json_fields['City'] + ', ';
          }
          if (res.json_fields['State']) {
            mailTo += res.json_fields['State'] + ' ';

          }
          if (res.json_fields['Zip']) {
            mailTo += res.json_fields['Zip'] + ', ';

          }
          if (res.json_fields['country']) {
            mailTo += res.json_fields['country'];
          }
          methodsInfo['Mail To'] = mailTo;
        }
        else {
          methodsInfo['Eckard Account'] = res.account.accountName;
          methodsInfo['Account Holder'] = res.json_fields['Recipient'];
          methodsInfo['Account Number'] = res.json_fields['Account_Number'];
          methodsInfo['Bank Name'] = res.json_fields['Bank_Name'];
          methodsInfo['ABA Routing Number'] = res.json_fields['Routing_Number'];
        }

        transferMethods.push({
          ...res,
          json_fields: methodsInfo

        })

      })
      this.spinner.hide()
      const groupByType = this.groupBy(transferMethods, "type");
      console.log(groupByType)
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
        this.methods = {};
        this.selectAccount = ''
        this.selectedType = ''
        this.spinner.hide();
        this.getAccountMethods()
        this.toastr.success('Account Method Added Successfully!');
        this.addAccount = !this.addAccount;


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
    this.methods = {};
    switch (value) {
      case 'account':
        this.methods.account_id = this.selectAccount;
        this.methods.Recipient = ''
        this.methods.Bank_Name = ''
        this.methods.Account_Number = ''
        this.methods.Routing_Number = ''

        // this.getAccountMethods()

        break;
      case 'type':
        this.methods.type = this.selectedType
        this.methods.Recipient = ''
        this.methods.mailto = ''
        this.methods.Street = ''
        this.methods.City = ''
        this.methods.State = ''
        this.methods.country = 'USA'
        this.methods.Zip = ''
        break;
      default:
        return
    }
  }

  handleFieldsAvailable() {
    if (this.selectedType == 'Wire') {

      if (
        this.methods.Recipient &&
        this.methods.Bank_Name &&
        this.methods.Account_Number &&
        this.methods.Routing_Number) {
        return true;
      } else {
        return false;
      }
    }
    else if (this.selectedType == 'Check') {
      if (
        this.methods.Recipient &&
        this.methods.type &&
        this.methods.mailto &&
        this.methods.Street &&
        this.methods.City &&
        this.methods.State &&
        this.methods.country &&
        this.methods.Zip) {
        return true;
      } else {
        return false;
      }

    }
    return false
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
    body.signup_journey = false
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

  toggleData(index: number) {
    // Toggle the value of the showData[index] variable
    this.showData[index] = !this.showData[index];
  }


  toggleData1(index: number) {
    // Toggle the value of the showData[index] variable
    this.showData1[index] = !this.showData1[index];
  }


  handleOfferDealMessages() {
    this.myOffersService.handleOfferDealMessages().subscribe(
      (response) => {
        this.offerConfirmMessages = response

      },
      (error: any) => {
        console.error("Error getting key vlaue  : ", error);
      },
      () => console.log("Done getting key vlaue .")
    )
  }

  handleAlertMessage(type: any, obj = null) {
    this.deleteFTM = false
    if (type === 'Add') {
      let message = this.offerConfirmMessages?.filter(
        (item: any) => item.key == 'Add FTM'
      )
      this.offerDisclaimer = message[0]
    }
    if (type === 'Delete') {
      this.deleteFTM = true
      this.deleteFTMethod = obj
      let message = this.offerConfirmMessages?.filter(
        (item: any) => item.key == 'Delete FTM'
      )
      this.offerDisclaimer = message[0]
    }
  }

  handleDeleteFTM(flag = false) {
    this.spinner.show()
    this.myListingsService
      .handleDeleteFTM(this.deleteFTMethod.id, flag)
      .subscribe(
        (response: any) => {
          this.spinner.hide()
          if (response.error) {

            let message = this.offerConfirmMessages?.filter(
              (item: any) => item.key == 'Delete FTM ForceFully'
            )
            this.offerDisclaimer = message[0]
            this.toastr.warning(response.error);
            this.isShow = true
          }
          else {
            this.getAccountMethods();
            this.isShow = false
            this.toastr.success('Fund Transfer Method Delete Successfully');

          }

        },
        (error: any) => {
          this.spinner.hide()
          console.error('Error getting accounts: ', error)
        },
        () => console.log('Done getting accounts.')
      )
  }

  handleFTMAccepted(list: any) {
    if(list?.status?.status == 'Accepted'){
      return true
    }
    return   false
  }
}

