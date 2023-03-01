import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/components/services/login.service';

@Component({
  selector: 'app-seller-transactions',
  templateUrl: './seller-transactions.component.html',
  styleUrls: ['./seller-transactions.component.css']
})
export class SellerTransactionsComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService,
    
  ) { }
  
  ngOnInit(): void {
    if (this.loginService?.user?.status != "active" || this.loginService?.user?.role?.name == 'Eckard') {
      this.router.navigate(['/market-place']);
      return

    }
  }
  transactionStatus = 'Sell'

}
