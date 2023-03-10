import { Component, Input, OnInit } from '@angular/core';
import { AuctionType, Constraint, MyListing } from 'src/components/model/my-listings';

@Component({
  selector: 'app-general-data-tab',
  templateUrl: './general-data-tab.component.html',
  styleUrls: ['./general-data-tab.component.css']
})

export class GeneralDataTabComponent implements OnInit {
  @Input() auctionTypeOptions!: AuctionType[]
  @Input() constraintOptions!: any[]
  @Input() createNewListing!: MyListing
  @Input() isListDraft!: boolean



  constructor() { }

  ngOnInit(): void {
    console.log("constraints constructer", this.constraintOptions)
  }

  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.createNewListing.constraints = this.constraintOptions
      .filter(value => value.isChecked)
      .map(value => value.id);
    console.log("BUYER SIDE "+this.createNewListing)
  }

  auctionTypeComparator(a: any, b: any) {
    return (a && b) ? a.id === b.id : false;
  }

}
