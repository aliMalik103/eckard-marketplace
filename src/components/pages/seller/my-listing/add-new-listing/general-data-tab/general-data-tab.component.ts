import { Component } from '@angular/core';

@Component({
  selector: 'app-general-data-tab',
  templateUrl: './general-data-tab.component.html',
  styleUrls: ['./general-data-tab.component.css']
})
export class GeneralDataTabComponent {

  generalDataAuctionType: Array<string> = [
    'Silent Minimum Ask',
    'Public Minimum Ask',
    'Silent Buy Now or Make an Offer',
    'Public Buy Now or Make an Offer',
    'Fix Price',
    'Direct Sale'
  ]

  constructor() {

  }

}
