import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginService } from 'src/components/services/login.service';
import { ProfileComponent } from './profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';




@NgModule({
    declarations: [ProfileComponent],
    imports: [
        AppRoutingModule,
        FormsModule,
        CommonModule,
        BrowserAnimationsModule,
        ImageCropperModule,
        BrowserModule,
        NgxSpinnerModule

    ],
    providers: [LoginService,ToastrService],
    exports: []
})
export class ProfileModule { }
