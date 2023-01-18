import { Component, Input, OnInit, Output } from '@angular/core';
import { Project, Account, MyListing, Tract } from 'src/components/model/my-listings';
import { AddNewListingService } from '../add-new-listing.service';

@Component({
  selector: 'app-listing-details-tab',
  templateUrl: './listing-details-tab.component.html',
  styleUrls: ['./listing-details-tab.component.css']
})
export class ListingDetailsTabComponent implements OnInit {

  @Input() projectsOptions!: Project[]
  @Input() accountsOptions!: Account[]
  @Input() createNewListing!: MyListing
  @Input() tracts!: Tract[]

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
  constructor(private addNewListingService: AddNewListingService) {

  }

  ngOnInit(): void {
    console.log("listing tab", this.addNewListingService)
  }

  handleChange(value: string) {
    switch (value) {
      case 'account':
        this.createNewListing.account = parseInt(this.createNewListing.account);
        break;
      case 'project':
        this.createNewListing.project = parseInt(this.createNewListing.project);
        break;
      case 'nma':
        this.createNewListing.nma = parseFloat(this.createNewListing.nma);
        break;
      case 'minimumAsk':
        this.createNewListing.minimumAsk = parseFloat(this.createNewListing.minimumAsk);
        break;
      default:
        return
    }
    console.log(this.createNewListing)
  }

  handleRemoveAndAddClass() {
    this.addNewListingService.handleRemoveAndAddClass()
  }

  handleTractLength() {
    if (this.tracts) {
      return this.tracts.length
    }
    return 0;
  }

}
