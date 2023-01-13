import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddNewListingService {
  projectType!: any

  projectsOptions: Array<string> = [
    'ANY Project',
    'ELA Bryant',
    'ELA Cooley',
    'ELA Mobley',
    '221203 AUE'
  ]


  selectAllOperators!: boolean;
  selectAllCountries!: boolean;
  selectAllProject!: boolean;


  constructor() { }

  handleProjectType(projectType: any) {
    this.projectType = projectType
  }

  toggleSelection(flag: boolean, value: any) {
    switch (value) {
      case 'selectAllOperators':
        this.selectAllOperators = flag
        break;
      case 'selectAllCountries':
        this.selectAllCountries = flag
        break;
      case 'selectAllProject':
        this.selectAllProject = flag
        break;
      default:
        return
    }
  }

  getSelectedValues() {

  }

  handleRemoveAndAddClass() {
    this.toggleActiveClass(['listingDetails-tab', 'listingDetails'], false);
    this.toggleActiveClass(['addTracts-tab', 'addTracts'], true);
  }

  private toggleActiveClass(elements: string[], isAdd: boolean) {
    elements.forEach(element => {
      let currentElement = document.getElementById(element);
      if (isAdd) {
        currentElement?.classList.add("active");
        currentElement?.classList.add("show");
      } else {
        currentElement?.classList.remove("active");
        currentElement?.classList.remove("show");
      }
    });
  }
}
