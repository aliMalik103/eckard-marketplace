import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logo!: string;

  constructor(private loginService: LoginService) {
    this.logo = environment.LOGO

  }

  isAuthanticated() {
    return this.loginService.isAuthanticated;
  }
  handleLogOut() {
    this.loginService.logout();
  }

}
