import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginService } from 'src/components/services/login.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { MyOffersService } from 'src/components/services/my-offers.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [SignUpComponent, ResetPasswordComponent],
  imports: [
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgxSpinnerModule
  ],
  providers: [LoginService, ToastrService, MyOffersService],
  exports: [SignUpComponent]
})
export class SignUpModule { }
