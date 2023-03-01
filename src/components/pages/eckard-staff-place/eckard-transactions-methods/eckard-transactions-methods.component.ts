import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/components/services/login.service';
import { MyListingsService } from 'src/components/services/my-listings.service';

@Component({
  selector: 'app-eckard-transactions-methods',
  templateUrl: './eckard-transactions-methods.component.html',
  styleUrls: ['./eckard-transactions-methods.component.css']
})
export class EckardTransactionsMethodsComponent implements OnInit {

  constructor( private spinner: NgxSpinnerService,
    private loginService: LoginService, private router: Router
  ) {
  }

  ngOnInit(): void {

    if (this.loginService?.user?.status != 'active' || this.loginService?.user?.role?.name != 'Eckard') {
      this.router.navigate(['/market-place'])
      return
    }
  }


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
