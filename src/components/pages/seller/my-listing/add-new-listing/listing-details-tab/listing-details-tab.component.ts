import { Component, Input, OnInit } from '@angular/core';
import { Project, Account, MyListing, Tract } from 'src/components/model/my-listings';
import { AddNewListingService } from '../add-new-listing.service';
import { MyListingsService } from 'src/components/services/my-listings.service';


@Component({
  selector: 'app-listing-details-tab',
  templateUrl: './listing-details-tab.component.html',
  styleUrls: ['./listing-details-tab.component.css'],

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
  constructor(private addNewListingService: AddNewListingService, private myListingsService: MyListingsService) {

  }

  ngOnInit(): void {
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
    const filteredProjects = this.myListingsService.userAccountsAndProjects?.filter(
      (item) => item.account.id === id
    );

    this.projectsOptions = filteredProjects?.map((item) => item.project);
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
