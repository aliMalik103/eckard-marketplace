import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/components/services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isPassword = false
  isResetPasswordFlag: boolean = false
  signUPForm: any = {
    email: ""
  }
  resetPassword: any = {
    regular_user: null,
    email: '',
    newPassword: '',
    confirmNewPassword: ''
  }

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService,
    private loginService: LoginService, private router: Router,
  ) {

  }

  ngOnInit(): void {
    let userData = localStorage.getItem('user');

    if (userData != 'null') {
      this.router.navigate(['/market-place']);
      return
    }
  }

  handleSubmit() {

    this.spinner.show()
    this.loginService.handleVerifySignUp(this.signUPForm.email).subscribe(
      (response: any) => {
        this.spinner.hide()
        if (response.user.length > 0 ) {

          if(response.contact.length > 0 && response.contact[0].mp_name != null){
          this.toastr.warning('Account with this email already exist.')
          this.router.navigate([''])
          }
          else{
            this.toastr.info('Please set your password.')
            this.resetPassword.regular_user = response.reg_user[0].id
            this.resetPassword.email = response.user[0].email
            this.isResetPasswordFlag = true
          }

        }
        else {
          this.toastr.error('Invalid Request try with valid email.')
        }


      },
      (error: any) => {
        this.spinner.hide()
        this.toastr.error('Something went wrong please Try again!')
        console.log("error", error)
      },
      () => console.log("Sign-Up New User"));

  }

  togglePassword() {
    this.isPassword = !this.isPassword;
  }
}
