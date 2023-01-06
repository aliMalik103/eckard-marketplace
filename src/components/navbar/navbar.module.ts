import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';


import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    AppRoutingModule
  ],
  providers: [],
  exports: [NavbarComponent]
})
export class NavbarModule { }
