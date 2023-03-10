import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/components/services/login.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  @Input() resetPassword!: any

  isPassword: boolean = false;
  isconfirmPassword: boolean = false;


  constructor(private loginService: LoginService, private spinner: NgxSpinnerService,
    private toastr: ToastrService, private router: Router) {
  }

  handleResetPassword() {
    this.spinner.show()
    if (this.resetPassword.newPassword === this.resetPassword.confirmNewPassword) {
      // Call password reset service with new password
      let body = {
        id: this.resetPassword.id,
        mpStatus:'active',
        email: this.resetPassword.email,
        password: this.resetPassword.newPassword,
        regular_user: this.resetPassword.regular_user,
        signup_journey: true
      }

      this.loginService.updateProfileDetails(body).subscribe(
        (response) => {
          this.spinner.hide()
          this.toastr.success('Congratulations! You have successfully signed up to our marketplace.')
          this.router.navigate(['']);

        },
        (error: any) => {
          this.spinner.hide()
          this.toastr.error('Something went wrong');
          console.log("error", error)
        },
        () => console.log("Done getting user"))
      console.log(this.resetPassword)
    } else {
      this.spinner.hide()
      this.toastr.error('Confirm password does not match with new password.');
      // Show error message that passwords don't match
    }
  }

  handleCheckPWD() {
    if (this.resetPassword.newPassword != '' && this.resetPassword.confirmNewPassword != '' && this.resetPassword.newPassword === this.resetPassword.confirmNewPassword) {
      return false
    }
    return true
  }

}
