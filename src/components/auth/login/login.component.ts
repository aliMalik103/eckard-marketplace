import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from 'src/components/model/login';
import { LoginService } from 'src/components/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isPassword: boolean = false
  loginForm: LoginForm = {
    email: "",
    password: ""
  }
  errorMessage: string = "User Not Found";
  isError: boolean = false;
  isloading: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {

  }
  ngOnInit(): void {
    if (this.loginService.user) {
      this.router.navigate(['/market-place']);
      return
    }
  }

  togglePassword() {
    this.isPassword = !this.isPassword;
  }

  handleSubmit() {
    this.isloading = true
    this.loginService.login(this.loginForm).subscribe(
      (response) => {
        console.log('success', response)
        this.isloading = false
        this.isError = false
      },
      (error: any) => {
        this.isloading = false
        this.isError = true
        console.log("error", error)
      },
      () => console.log("Done getting user"));
  }

}
