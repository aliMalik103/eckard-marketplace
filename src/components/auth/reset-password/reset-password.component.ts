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
    if (this.resetPassword.newPassword === this.resetPassword.confirmNewPassword) {
      // Call password reset service with new password
      let body = {
        id: this.resetPassword.id,
        password: this.resetPassword.newPassword
      }
      this.loginService.updateProfileDetails(body).subscribe(
        (response) => {
          this.spinner.hide()
          this.toastr.success('Password Reset Successfully');
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
