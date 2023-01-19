import { Component, Input, OnInit, Output } from '@angular/core';
import { Project, Account, MyListing, Tract } from 'src/components/model/my-listings';
import { AddNewListingService } from '../add-new-listing.service';

@Component({
  selector: 'app-listing-details-tab',
  templateUrl: './listing-details-tab.component.html',
  styleUrls: ['./listing-details-tab.component.css']
})
export class ListingDetailsTabComponent implements OnInit {

  @Input() accountsOptions!: Account[]
  @Input() createNewListing!: MyListing
  @Input() tracts!: Tract[]
  @Input() isListDraft!: boolean
  projectsOptions!: Project[]



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
    console.log("listing createNewListing", this.createNewListing)
    this.handleUserProject(this.createNewListing.account)
  }

  handleChange(value: string) {
    switch (value) {
      case 'account':
        this.createNewListing.account = parseInt(this.createNewListing.account);
        this.handleUserProject(this.createNewListing.account)
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

  handleUserProject(id: number) {
    const filteredProjects = this.addNewListingService?.userAccountsAndProjects?.filter(
      (item) => item.account.id === id
    );

    this.projectsOptions = filteredProjects?.map((item) => item.project);


    console.log("accounts Projects", this.projectsOptions)
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
  handleProjectLEngth() {
    if (this.projectsOptions) {
      return this.projectsOptions.length
    }
    return 0;
  }

}
