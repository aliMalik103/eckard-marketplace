import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AddNewListingComponent } from './add-new-listing.component';

@NgModule({
    declarations: [
        AddNewListingComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    exports: [AddNewListingComponent]
})
export class AddNewListingModule {

}
