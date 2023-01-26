import { Component } from '@angular/core';
import { CashConfig } from 'src/components/model/my-listings';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent {
  basicCashFlow: CashConfig = {
    id: null,
    account: null,
    project: null,
    noOfMonths: 0,
    decline: 0,
    gasPrice: 0,
    oilPrice: 0
  }

}
