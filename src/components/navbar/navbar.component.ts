import { Component } from '@angular/core';
import { LoginService } from '../auth/login/login.service';
import { environment } from 'src/environments/environment';


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
