import { Component } from '@angular/core';
import { LoginForm } from 'src/components/model/login';
import { LoginService } from 'src/components/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  isPassword: boolean = false
  loginForm: LoginForm = {
    email: "",
    password: ""
  }
  errorMessage: string = "User Not Found";
  isError: boolean = false;
  isloading: boolean = false;

  constructor(private loginService: LoginService) {

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
