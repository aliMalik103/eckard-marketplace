import { Component } from '@angular/core';

@Component({
  selector: 'app-eckard-transactions-methods',
  templateUrl: './eckard-transactions-methods.component.html',
  styleUrls: ['./eckard-transactions-methods.component.css']
})
export class EckardTransactionsMethodsComponent {

  transactionsMethodsColumns = ['Account', 'Type', 'Action(s)']
  transactionsMethodData = []
  page: number = 1
  count: number = 0
  tableSize: number = 50
  tableSizes: any = [3, 6, 9, 12]
  searchParam = ''




  onTableDataChange(event: any) {
    this.page = event
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value
    this.page = 1
  }

  handleChange() {
    if (!this.searchParam) {
      return;
    }

  }

}
