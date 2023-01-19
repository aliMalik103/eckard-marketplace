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
  @Input() isListDraft!:boolean



  constructor() {}

  ngOnInit(): void {
    console.log("constraints constructer", this.constraintOptions)
  }

  handleChange() {
    this.createNewListing.auction_type = parseInt(this.createNewListing.auction_type);
  }

  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.createNewListing.constraints = this.constraintOptions
      .filter(value => value.isChecked)
      .map(value => value.id);
    console.log(this.createNewListing)
  }

}
