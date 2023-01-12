import { Component } from '@angular/core';
import { AddNewListingService } from '../add-new-listing.service';

@Component({
  selector: 'app-add-tracts-tab',
  templateUrl: './add-tracts-tab.component.html',
  styleUrls: ['./add-tracts-tab.component.css']
})
export class AddTractsTabComponent {


  projectsOptions!: Array<string>;
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



  constructor(private addNewListingService: AddNewListingService) {
    this.projectsOptions = this.addNewListingService.projectsOptions
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