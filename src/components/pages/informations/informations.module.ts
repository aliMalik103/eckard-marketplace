import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SECDisclosureModule } from './sec-disclosure/sec-disclosure.module';
import { UserAgreementModule } from './user-agreement/user-agreement.module';

@NgModule({
    declarations: [
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        SECDisclosureModule,
        UserAgreementModule
    ],
    providers: [],
    exports: []
})
export class InformationsModule { }
