import { Component, Input, OnInit } from '@angular/core';
import { MyListing, Project } from 'src/components/model/my-listings';
import { AddNewListingService } from '../add-new-listing.service';

@Component({
  selector: 'app-add-tracts-tab',
  templateUrl: './add-tracts-tab.component.html',
  styleUrls: ['./add-tracts-tab.component.css']
})
export class AddTractsTabComponent implements OnInit {
  @Input() projectsOptions!: Project[]
  @Input() createNewListing!: MyListing
  @Input() isListDraft!: boolean


  countriesOptions: Array<string> = [
    'ANY County',
    'OK-Grady',
    'OK-Kingfisher',
    'OK-MoClain'
  ]
  operatorsOptions: Array<string> = [
    'ANY Operator',
    'Citizen Energy III LLC',
    'Coterra Energy INC',
    'Devon Energy Production CO LP',
    'Ovintiv Mid Continent INC',

  ]

  tractsColumns: Array<string> = [
    'Location',
    'Project',
    'County,State',
    'Wells',
    'Royalty',
    'Income',
    'ROI',
    'my NMA'

  ]

  options: Array<any> = [
    'equal to',
    'not equal to',
    'greater than',
    'greater than or equal to',
    'less than',
    'less than or equal to'
  ];
  ageofWells: Array<string> = [
    'All Wells Greater Than',
    'All Wells Less Than',
    'Any Wells Greater Than',
    'Any Wells Less Than',
    'All New Wells Greater Than',
    'All New Wells Less Than',
    'Any New Wells Greater Than',
    'Any New Wells Less Than',
    'All Vintage Wells Greater Than',
    'All Vintage Wells Less Than',
    'Any Vintage Wells Greater Than',
    'All Vintage Wells Less Than'
  ]
  selectAllOperators!: boolean;
  selectAllCountries!: boolean;
  selectAllProject!: boolean;

  data = {
    projectSelect: [],
    countriesSelect: [],
    operatorsSelect: [],

  };



  constructor(private addNewListingService: AddNewListingService) {
  }
  ngOnInit(): void {
    console.log('Method not implemented.');
  }

  toggleSelection(flag: boolean, value: any) {

    this.addNewListingService.toggleSelection(flag, value)
    this.selectAllOperators = this.addNewListingService.selectAllOperators
    this.selectAllCountries = this.addNewListingService.selectAllCountries
    this.selectAllProject = this.addNewListingService.selectAllProject
  }

  getSelectedValues() {
    this.addNewListingService.getSelectedValues()
  }

}
