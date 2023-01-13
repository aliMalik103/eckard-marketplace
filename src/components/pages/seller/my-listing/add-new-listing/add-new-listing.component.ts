import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddNewListingService } from './add-new-listing.service';

@Component({
  selector: 'app-add-new-listing',
  templateUrl: './add-new-listing.component.html',
  styleUrls: ['./add-new-listing.component.css']
})
export class AddNewListingComponent implements OnInit {
  @Output() onGoBack = new EventEmitter()

  pType: any;

  constructor(private addNewListingService: AddNewListingService) {
  }

  ngOnInit(): void {
    this.pType = this.addNewListingService.projectType

  }

  handleGoBack() {
    this.onGoBack.emit()
  }

  handleProjectType(value: string) {
    this.addNewListingService.handleProjectType(value)
    this.pType = this.addNewListingService.projectType

  }


}