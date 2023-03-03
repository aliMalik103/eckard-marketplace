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

  signUPForm: any = {
    email: "",
    password: "",
    mpStatus: 'active'
  }

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService,
    private loginService: LoginService, private router: Router,
  ) {

  }

  ngOnInit(): void {

    console.log('')
  }

  handleSubmit() {
    this.toastr.info('Sign up flow inprogress')
    this.router.navigate([''])
    // this.spinner.show()

    // this.loginService.signUp(this.signUPForm).subscribe(
    //   (response) => {
    //     console.log(response)
    //     this.spinner.hide()
    //     this.toastr.success('Congratulations! You have successfully signed up to our marketplace.')
    //     this.router.navigate([''])
    //   },
    //   (error: any) => {
    //     this.spinner.hide()
    //     this.toastr.error('Something went wrong please Try again!')
    //     console.log("error", error)
    //   },
    //   () => console.log("Sign-Up New User"));

  }

  togglePassword() {
    this.isPassword = !this.isPassword;
  }
}
