import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EckardStaffPlaceComponent } from './eckard-staff-place.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [EckardStaffPlaceComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgxSpinnerModule
  ],
  exports: [EckardStaffPlaceComponent]

})
export class EckardStaffPlaceModule { }
