import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { LoginForm } from 'src/components/model/login';
import { Router } from '@angular/router';


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

  constructor(private loginService: LoginService,private router: Router) { }

  togglePassword() {
    this.isPassword = !this.isPassword;
  }

  handleSubmit() {
    this.loginService.login(this.loginForm).subscribe(
      (response) => {
      if(response.data.valid==true){
      this.router.navigate(['/market-place']);
      }
      else{
        alert("Invalid email or password")
      }
   
      () => console.log("Done getting user")});
  }

}
