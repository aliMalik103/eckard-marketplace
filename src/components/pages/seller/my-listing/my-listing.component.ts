import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-listing',
  templateUrl: './my-listing.component.html',
  styleUrls: ['./my-listing.component.css']
})
export class MyListingComponent implements OnInit {

  showAllListing: boolean = false

  constructor() {

  }
  ngOnInit(): void {
    this.showAllListing = false
    console.log('Method not implemented.');
  }

  handleToggel() {
    this.showAllListing = !this.showAllListing;
  }

}
