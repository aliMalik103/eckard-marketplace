import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { MyBidsComponent } from './my-bids.component';

@NgModule({
  declarations: [
    MyBidsComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,

  ],
  providers: [],
  exports: [MyBidsComponent]
})
export class MyBidsModule { }
