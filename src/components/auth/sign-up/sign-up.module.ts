import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginService } from 'src/components/services/login.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';



@NgModule({
  declarations: [SignUpComponent],
  imports: [
    AppRoutingModule,
    FormsModule,
    CommonModule,
    NgxSpinnerModule,
  ],
  providers: [LoginService,ToastrService,],
  exports:[SignUpComponent]
})
export class SignUpModule { }
