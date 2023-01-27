import { Component, Input } from '@angular/core';
import { CashConfig } from 'src/components/model/my-listings';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent {
  @Input() constraintOptions!: any[]
  @Input() newOffer!: any
  @Input() offer: any


  basicCashFlow: CashConfig = {
    id: null,
    account: null,
    project: null,
    noOfMonths: 0,
    decline: 0,
    gasPrice: 0,
    oilPrice: 0,
    contact:null
  }

  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.newOffer.constraints = this.constraintOptions
      .filter(value => value.isChecked)
      .map(value => value.id);
  }


}
