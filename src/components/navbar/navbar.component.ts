import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../model/login';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnChanges {
  logo!: string;
  user!: UserDetails

  constructor(private loginService: LoginService) {
    this.logo = environment.LOGO
    this.user = this.loginService?.user

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("navbar onChange")
  }

  isAuthanticated() {
    if (this.loginService?.user) {
      this.user = this.loginService.user
    }
    return this.loginService.isAuthanticated;
  }

  handleLogOut() {
    this.loginService.logout();
  }

}
