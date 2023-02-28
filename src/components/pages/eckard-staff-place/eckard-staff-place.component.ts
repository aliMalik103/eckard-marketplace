import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/components/services/login.service';
import { MyListingsService } from 'src/components/services/my-listings.service';

@Component({
  selector: 'app-eckard-staff-place',
  templateUrl: './eckard-staff-place.component.html',
  styleUrls: ['./eckard-staff-place.component.css']
})
export class EckardStaffPlaceComponent implements OnInit {

  pendingPSA = 0
  completedFT = 0
  pendingPAT = 0
  totalFTM = 0

  constructor(private activeRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private loginService: LoginService, private router: Router, private myListingsService: MyListingsService,

  ) {
  }

  ngOnInit(): void {
    this.handleGetPendingTransactions()
    this.handleGetCompeleteTransactions()
    this.handleGetPendingAssetTransactions()
  }

  handleGetPendingTransactions() {

    this.myListingsService.handleGetEckardTransactions('Pending PSA').subscribe(
      (response: any) => {
        this.spinner.hide()
        this.pendingPSA = response ? response.length : 0
      },
      (error: any) => {
        this.spinner.hide()
        console.log("Error getting  Pending PSA", error)
      },
      () => console.log("Done getting  Pending PSA "));
  }

  handleGetCompeleteTransactions() {

    this.myListingsService.handleGetEckardTransactions('Fund Transfer Complete').subscribe(
      (response: any) => {
        this.spinner.hide()
        this.completedFT = response ? response.length : 0

      },
      (error: any) => {
        this.spinner.hide()
        console.log("Error getting  Fund Transfer Complete", error)
      },
      () => console.log("Done getting  Fund Transfer Complete "));
  }

  handleGetPendingAssetTransactions() {

    this.myListingsService.handleGetEckardTransactions('Pending Asset Transfer').subscribe(
      (response: any) => {
        this.spinner.hide()
        this.pendingPAT = response ? response.length : 0

      },
      (error: any) => {
        this.spinner.hide()
        console.log("Error getting  Pending Asset Transfer", error)
      },
      () => console.log("Done getting  Pending Asset Transfer "));
  }

}
