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
    id: null,
    email: '',
    newPassword: '',
    confirmNewPassword: ''
  }

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService,
    private loginService: LoginService, private router: Router,
  ) {

  }

  ngOnInit(): void {

    console.log('')
  }

  handleSubmit() {

    this.spinner.show()

    this.loginService.signUp(this.signUPForm).subscribe(
      (response) => {
        this.spinner.hide()
        this.toastr.success('Congratulations! You have successfully signed up to our marketplace.')
        this.resetPassword.id = response.id
        this.resetPassword.email = response.email
        this.isResetPasswordFlag = true

      },
      (error: any) => {
        this.spinner.hide()
        if (error.error.email[0] == 'contact with this email already exists.') {
          this.toastr.info('Contact with this email already exists')
          this.router.navigate([''])

        }
        else {
          this.toastr.error('Something went wrong please Try again!')
        }
        console.log("error", error)
      },
      () => console.log("Sign-Up New User"));

  }

  togglePassword() {
    this.isPassword = !this.isPassword;
  }
}
