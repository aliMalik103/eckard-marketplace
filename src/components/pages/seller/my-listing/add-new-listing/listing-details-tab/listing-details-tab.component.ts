import { Component, Input, OnInit, Output } from '@angular/core';
import { AddNewListingService } from '../add-new-listing.service';

@Component({
  selector: 'app-listing-details-tab',
  templateUrl: './listing-details-tab.component.html',
  styleUrls: ['./listing-details-tab.component.css']
})
export class ListingDetailsTabComponent implements OnInit {

  projectsOptions!: Array<string>

  listingColumns: Array<string> = [
    'Location',
    'Project',
    'County,State',
    'Wells',
    'Royalty',
    'Income',
    'my NMA',
    'Listed NMA',
    '',
    'Listed Inc.'
  ]
  @Input() pType: any;

  constructor(private addNewListingService: AddNewListingService) {

  }
  ngOnInit(): void {
    this.projectsOptions = this.addNewListingService.projectsOptions;
    console.log("listing tab", this.addNewListingService)

  }


  handleRemoveAndAddClass() {
    this.addNewListingService.handleRemoveAndAddClass()
  }

}
