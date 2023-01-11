import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { SECDisclosureComponent } from './sec-disclosure.component';

@NgModule({
    declarations: [
        SECDisclosureComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        BrowserModule,

    ],
    providers: [],
    exports: [SECDisclosureComponent]
})
export class SECDisclosureModule { }
