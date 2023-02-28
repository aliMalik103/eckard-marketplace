import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EckardTransactionsMethodsComponent } from './eckard-transactions-methods.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { EckardTransactionsMethodsDetailsComponent } from './eckard-transactions-methods-details/eckard-transactions-methods-details.component';



@NgModule({
  declarations: [EckardTransactionsMethodsComponent, EckardTransactionsMethodsDetailsComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
  ],
  exports:[EckardTransactionsMethodsComponent]
})
export class EckardTransactionsMethodsModule { }
