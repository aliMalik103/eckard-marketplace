import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {

  @Input() listDetails: any
  @Input() offer: any
  @Input() isTransaction = false


  ngOnInit(): void {
    console.log('');
  }

}
