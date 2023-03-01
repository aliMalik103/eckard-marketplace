import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/components/services/login.service';

@Component({
  selector: 'app-sec-disclosure',
  templateUrl: './sec-disclosure.component.html',
  styleUrls: ['./sec-disclosure.component.css']
})
export class SECDisclosureComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService,
    
  ) { }

  ngOnInit(): void {
    if (this.loginService?.user?.status != "active" || this.loginService?.user?.role?.name == 'Eckard') {
      this.router.navigate(['/market-place']);
      return

    }  }

}
