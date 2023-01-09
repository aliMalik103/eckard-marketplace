import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';


import { NavbarComponent } from './navbar.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,

  ],
  providers: [],
  exports: [NavbarComponent]
})
export class NavbarModule { }
