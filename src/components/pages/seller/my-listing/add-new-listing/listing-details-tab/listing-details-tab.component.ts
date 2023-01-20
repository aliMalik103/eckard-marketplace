import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Project, Account, MyListing, Tract } from 'src/components/model/my-listings';
import { AddNewListingService } from '../add-new-listing.service';
import { MyListingsService } from 'src/components/services/my-listings.service';


@Component({
  selector: 'app-listing-details-tab',
  templateUrl: './listing-details-tab.component.html',
  styleUrls: ['./listing-details-tab.component.css'],

})
export class ListingDetailsTabComponent implements OnChanges {

  @Input() accountsOptions!: Account[]
  @Input() createNewListing!: MyListing
  @Input() tracts!: Tract[]
  @Input() isListDraft!: boolean
  @Output() isValidNMA = new EventEmitter()

  projectsOptions!: Project[]
  selectedProject!: Project



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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.accountsOptions?.length == 1) {
      this.handleUserProject(this.accountsOptions[0].id)
    }
    if (this.createNewListing) {
      this.handleFindTotalNMA(this.createNewListing?.project)

    }
    if (this.selectedProject) {
      this.isValidNMA.emit(this.selectedProject.totalNma < this.createNewListing.nma)
    }
  }

  handleChange(value: string) {
    switch (value) {
      case 'account':
        this.createNewListing.account = parseInt(this.createNewListing.account);
        this.handleUserProject(this.createNewListing.account)
        break;
      case 'project':
        this.createNewListing.project = parseInt(this.createNewListing.project);
        this.handleFindTotalNMA(this.createNewListing?.project)
        break;
      case 'nma':
        this.createNewListing.nma = parseFloat(this.createNewListing.nma);
        if (this.selectedProject) {
          this.isValidNMA.emit(this.selectedProject.totalNma < this.createNewListing.nma)
        }
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
    const filteredProjects = this.myListingsService.userAccountsAndProjects
      .filter(item => item.account.id === id)
      .map(item => item.project);

    const uniqueProjects = filteredProjects?.reduce((acc: any, current: any) => {
      const x = acc.find((item: any) => item.id === current.id && item.projectId === current.projectId);
      if (!x) {
        return [...acc, current];
      } else {
        x.totalNma = (parseFloat(x.totalNma) + parseFloat(current.totalNma)).toFixed(2).toString();
        x.totalRevenue = (parseFloat(x.totalRevenue) + parseFloat(current.totalRevenue)).toFixed(2).toString();
        return acc;
      }
    }, []);

    this.projectsOptions = uniqueProjects;

    if (this.projectsOptions.length === 1) {
      this.createNewListing.project = this.projectsOptions[0].id;
      this.handleFindTotalNMA(this.projectsOptions[0]?.id)
    }
  }

  handleFindTotalNMA(id: number) {
    this.projectsOptions
      ?.filter(item => {
        if (item.id === id) {
          this.selectedProject = item
        }
      })

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

  handleProjectLength() {
    if (this.projectsOptions) {
      return this.projectsOptions.length
    }
    return 0;
  }

}
