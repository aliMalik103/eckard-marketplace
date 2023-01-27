import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {

  @Input() listDetails: any


  ngOnInit(): void {
    console.log(' List Details', this.listDetails);
  }

}
