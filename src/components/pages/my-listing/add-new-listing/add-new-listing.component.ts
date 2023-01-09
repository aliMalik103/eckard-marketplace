import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-new-listing',
  templateUrl: './add-new-listing.component.html',
  styleUrls: ['./add-new-listing.component.css']
})
export class AddNewListingComponent implements OnInit {
  @Output() onGoBack = new EventEmitter()
  constructor() {

  }
  ngOnInit(): void {
    console.log('Method not implemented.');
  }
  handleGoBack() {
    this.onGoBack.emit()

  }
}
