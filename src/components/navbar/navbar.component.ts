import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../model/login';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logo!: string;
  user!: UserDetails

  constructor(private loginService: LoginService) {
    this.logo = environment.LOGO
    this.user = this.loginService?.user

  }

  isAuthanticated() {
    return this.loginService.isAuthanticated;
  }
  handleLogOut() {
    this.loginService.logout();
  }

}
