import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { UserAgreementComponent } from './user-agreement.component';
import { LoginService } from 'src/components/services/login.service';

@NgModule({
    declarations: [
        UserAgreementComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        BrowserModule,

    ],
    providers: [LoginService],
    exports: [UserAgreementComponent]
})
export class UserAgreementModule { }
