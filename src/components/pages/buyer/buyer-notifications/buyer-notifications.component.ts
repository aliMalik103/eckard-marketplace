import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/components/services/login.service';

@Component({
  selector: 'app-buyer-notifications',
  templateUrl: './buyer-notifications.component.html',
  styleUrls: ['./buyer-notifications.component.css']
})
export class BuyerNotificationsComponent implements OnInit {

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




}
