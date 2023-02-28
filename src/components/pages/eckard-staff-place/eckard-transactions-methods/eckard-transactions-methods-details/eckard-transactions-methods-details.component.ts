import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-eckard-transactions-methods-details',
  templateUrl: './eckard-transactions-methods-details.component.html',
  styleUrls: ['./eckard-transactions-methods-details.component.css']
})
export class EckardTransactionsMethodsDetailsComponent implements OnInit {
  @Input() index!: any
  @Input() transaction!: any

  constructor(){
    
  }

  ngOnInit(): void {
    console.log('');
  }

}
