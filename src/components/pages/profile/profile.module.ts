import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginService } from 'src/components/services/login.service';
import { ProfileComponent } from './profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MyOffersService } from 'src/components/services/my-offers.service';




@NgModule({
    declarations: [ProfileComponent],
    imports: [
        AppRoutingModule,
        FormsModule,
        CommonModule,
        BrowserAnimationsModule,
        BrowserModule,
        NgxSpinnerModule
    ],
    providers: [LoginService,ToastrService, MyOffersService],
    exports: []
})
export class ProfileModule { }
