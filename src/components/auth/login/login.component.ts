import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { LoginForm } from 'src/components/model/login';


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

  constructor(private loginService: LoginService) { }

  togglePassword() {
    this.isPassword = !this.isPassword;
  }

  handleSubmit() {
    this.loginService.login(this.loginForm).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log("Done getting user"));
  }

}
