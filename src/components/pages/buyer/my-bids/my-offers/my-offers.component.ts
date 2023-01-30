import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CashConfig } from 'src/components/model/my-listings';
import { LoginService } from 'src/components/services/login.service';
import { MyListingsService } from 'src/components/services/my-listings.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {
  @Input() constraintOptions!: any[]
  @Input() newOffer!: any
  @Input() offer: any
  @Input() listDetails: any
  cashFlow!: any
  isRecalculate: boolean = false
  calculateTotalCashFlow: any = 0

  constructor(private myListingsService: MyListingsService, 
    private loginService: LoginService, private toastr: ToastrService,) {

  }

  ngOnInit(): void {
    this.handleGetCashFlow()
    this.handleGetCashConfig()

  }



  basicCashFlow: CashConfig = {
    id: null,
    noOfMonths: 36,
    decline: 1.5,
    gasPrice: 3.5,
    oilPrice: 75,
    contact: null
  }

  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.newOffer.constraints = this.constraintOptions
      .filter(value => value.isChecked)
      .map(value => value.id);
  }

  handleGetCashFlow() {
    this.offer.project_id && this.myListingsService.handleGetCashFlow(this.offer.project_id).subscribe(
      (response) => {
        this.cashFlow = response
      },
      (error: any) => {

        console.error("Error getting cashFlow cost : ", error);
      },
      () => console.log("Done getting cashFlow  .")
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
    this.calculateTotalCashFlow = this.myListingsService.handleCalculateCashFlow(this.basicCashFlow, this.cashFlow, this.listDetails);

  }

}
