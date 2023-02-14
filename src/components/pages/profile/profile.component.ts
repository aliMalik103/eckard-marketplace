import { LoginService } from 'src/components/services/login.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface Profile {
  id: any
  firstName: string
  lastName: any
  email: any
  notification: boolean
  mpStatus: any
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  isPassword: boolean = false
  isConfirmPassword: boolean = false
  imageChangedEvent: any = '';
  showCropper = false;



  profile: Profile = {
    id: null,
    firstName: "",
    lastName: '',
    email: "",
    notification: false,
    mpStatus: ''
  }
  constructor(private loginService: LoginService, private spinner: NgxSpinnerService,
    private toastr: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
    this.profileDetails()

  }

  handleSubmit() {
    this.updateProfileDetails(this.profile)
  }

  profileDetails() {
    this.spinner.show()

    this.loginService.profileDetails(this.loginService?.user?.id).subscribe(
      (response) => {
        this.spinner.hide()
        if (response) {
          this.profile.email = response?.email
          this.profile.id = response?.id
          this.profile.firstName = response?.firstName
          this.profile.lastName = response?.lastName
          this.profile.mpStatus = response?.mpStatus
          this.profile.notification = response.notification
        }
      },
      (error: any) => {
        this.spinner.hide()

        console.log("error", error)
      },
      () => console.log("Done getting user"));
  }

  updateProfileDetails(body: any) {
    this.spinner.show()

    this.loginService.updateProfileDetails(body).subscribe(
      (response) => {
        this.spinner.hide()
        this.toastr.success('Profile Update Successfully');
        this.router.navigate(['/market-place']);
        if (response) {

          this.profile.email = response?.email
          this.profile.id = response?.id
          this.profile.firstName = response?.firstName
          this.profile.lastName = response?.lastName
          this.profile.mpStatus = response?.mpStatus
          this.profile.notification = response.notification
        }
      },
      (error: any) => {
        this.spinner.hide()
        this.toastr.error('Something went wrong');
        console.log("error", error)
      },
      () => console.log("Done getting user"));
  }

}

