import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { UserAgreementComponent } from './user-agreement.component';

@NgModule({
    declarations: [
        UserAgreementComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        BrowserModule,

    ],
    providers: [],
    exports: [UserAgreementComponent]
})
export class UserAgreementModule { }
