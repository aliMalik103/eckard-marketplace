import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { SECDisclosureComponent } from './sec-disclosure.component';
import { LoginService } from 'src/components/services/login.service';

@NgModule({
    declarations: [
        SECDisclosureComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        BrowserModule,

    ],
    providers: [LoginService],
    exports: [SECDisclosureComponent]
})
export class SECDisclosureModule { }
