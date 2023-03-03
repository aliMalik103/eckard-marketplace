import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddNewListingService } from 'src/components/pages/seller/my-listing/add-new-listing/add-new-listing.service';
import { MyOffersService } from 'src/components/services/my-offers.service';
import { LoginService } from 'src/components/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-eckard-transactions-methods-details',
  templateUrl: './eckard-transactions-methods-details.component.html',
  styleUrls: ['./eckard-transactions-methods-details.component.css']
})
export class EckardTransactionsMethodsDetailsComponent implements OnInit {
  @Input() index!: any
  @Input() transaction!: any
  offerConfirmMessages!: any
  offerDisclaimer!: any
  currentFTM!: any
  statusOptions!: any
  @Output() handleSubmit = new EventEmitter()


  constructor(private myOffersService: MyOffersService, private loginService: LoginService,
    private toastr: ToastrService, private addNewListingService: AddNewListingService,
    private spinner: NgxSpinnerService,) {

  }

  ngOnInit(): void {
    console.log('');
    this.handleOfferDealMessages()
    this.handleGetStatus()
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

  handleAlertMessage(obj: any) {
    this.currentFTM = obj
    let message = this.offerConfirmMessages?.filter(
      (item: any) => item.key == 'Approve FTM'
    )
    this.offerDisclaimer = message[0]


  }

  handleApproveFTM(method: any) {
    this.spinner.show()

    let accepted = this.statusOptions?.find((item: any) => item.status === "Accepted");
    method.status = accepted.id
    this.loginService.updateTransactionMethod(method).subscribe(
      (response) => {
        this.spinner.hide()
        this.handleSubmit.emit()
        this.toastr.success('Account Method Approve Successfully!');
      },
      (error: any) => {
        this.spinner.hide()
        console.log("Error getting  Approve Asset Transfer", error)
      },
      () => console.log("Done getting  Approve Asset Transfer "))
  }

}
